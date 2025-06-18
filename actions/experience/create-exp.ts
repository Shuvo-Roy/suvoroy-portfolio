"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Validation schema for Experience
const createExperienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
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

type CreateExperienceFormState = {
  errors: {
    company?: string[];
    position?: string[];
    startDate?: string[];
    endDate?: string[];
    description?: string[];
    formError?: string[];
  };
};

export const createExperience = async (
  prevState: CreateExperienceFormState,
  formData: FormData
): Promise<CreateExperienceFormState> => {
  const result = createExperienceSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    description: formData.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { errors: { formError: ["You must be logged in to add experience."] } };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return { errors: { formError: ["User not found. Please register."] } };
  }

  try {
    await prisma.experience.create({
      data: {
        company: result.data.company,
        position: result.data.position,
        startDate: new Date(result.data.startDate),
        endDate: result.data.endDate ? new Date(result.data.endDate) : null,
        description: result.data.description || null,
        authorId: existingUser.id,
      },
    });
  } catch (err) {
    return {
      errors: { formError: ["Failed to create experience entry."] },
    };
  }

  revalidatePath("/dashboard/experience");
  redirect("/dashboard/experience");
};
