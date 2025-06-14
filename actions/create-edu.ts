"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ Validation schema for education
const createEducationSchema = z.object({
  institution: z.string().min(2, "Institution name is too short"),
  degree: z.string().min(2, "Degree is required"),
  field: z.string().min(2, "Field of study is required"),
  startDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Start date is invalid",
  }),
  endDate: z
    .string()
    .optional()
    .refine(date => !date || !isNaN(Date.parse(date)), {
      message: "End date is invalid",
    }),
  description: z.string().optional(),
});

type CreateEducationFormState = {
  errors: {
    institution?: string[];
    degree?: string[];
    field?: string[];
    startDate?: string[];
    endDate?: string[];
    description?: string[];
    formError?: string[];
  };
};

export const createEducation = async (
  prevState: CreateEducationFormState,
  formData: FormData
): Promise<CreateEducationFormState> => {
  const result = createEducationSchema.safeParse({
    institution: formData.get("institution"),
    degree: formData.get("degree"),
    field: formData.get("field"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    description: formData.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { errors: { formError: ["You must be logged in to add education."] } };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return { errors: { formError: ["User not found. Please register."] } };
  }

  try {
    await prisma.education.create({
      data: {
        institution: result.data.institution,
        degree: result.data.degree,
        field: result.data.field,
        startDate: new Date(result.data.startDate),
        endDate: result.data.endDate ? new Date(result.data.endDate) : null,
        description: result.data.description || null,
        authorId: existingUser.id,
      },
    });
  } catch (err) {
    return {
      errors: { formError: ["Failed to create education entry."] },
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
