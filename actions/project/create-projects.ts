"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Validation schema
const createProjectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(160),
  link: z.string().optional(),
  techstack: z.string(), // comma separated tech stack string
});

type CreateProjectFormState = {
  errors: {
    title?: string[];
    description?: string[];
    link?: string[];
    github?: string[];
    techstack?: string[];
    image?: string[];
    formError?: string[];
  };
};

export const createProject = async (
  prevState: CreateProjectFormState,
  formData: FormData
): Promise<CreateProjectFormState> => {
  // Validate form data
  const result = createProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    link: formData.get("link"),
    github: formData.get("github"),
    techstack: formData.get("techstack"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { errors: { formError: ["You must be logged in to create a project."] } };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return { errors: { formError: ["User not found. Please register."] } };
  }

  // Handle image upload to Cloudinary
  const imageFile = formData.get("featuredImage") as File | null;
  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as UploadApiResponse);
            }
          ).end(buffer);
        }
      );

      imageUrl = uploadResponse.secure_url;
    } catch (err) {
      return { errors: { image: ["Image upload failed. Please try again."] } };
    }
  }

  // Parse and prepare techStacks connectOrCreate array
  const techStackNames = result.data.techstack
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  // Prepare connectOrCreate data for techStacks relation
  const techStacksConnectOrCreate = techStackNames.map((name) => ({
    where: { name },
    create: { name },
  }));

  // Create the project with relation to techStacks
  try {
    await prisma.project.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        link: result.data.link || null,
        image: imageUrl,
        authorId: existingUser.id,
        techStacks: {
          connectOrCreate: techStacksConnectOrCreate,
        },
      },
    });
  } catch (error) {
    return { errors: { formError: ["Failed to create project."] } };
  }

  // Revalidate dashboard and redirect
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");

  return { errors: {} }; // success, no errors
};
