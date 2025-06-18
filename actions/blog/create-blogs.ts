"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"; // ✅ USE THE REAL SDK
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ Schema validation
const createBlogSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  metaDescription: z.string().min(10).max(160),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type CreateBlogFormState = {
  errors: {
    title?: string[];
    slug?: string[];
    metaDescription?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formError?: string[];
  };
};

export const createBlog = async (
  prevState: CreateBlogFormState,
  formData: FormData
): Promise<CreateBlogFormState> => {
  const result = createBlogSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    metaDescription: formData.get("metaDescription"),
    category: formData.get("category"),
    content: formData.get("content"),
  });
const entries = Array.from(formData.entries());
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { errors: { formError: ["You have to register first"] } };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return { errors: { formError: ["User not found. Please register"] } };
  }

  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: { featuredImage: ["Image file is invalid"] },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let uploadResponse: UploadApiResponse | undefined;
  try {
    uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    return {
      errors: {
        featuredImage: ["Cloudinary upload failed"],
      },
    };
  }

  const imageUrl = uploadResponse?.secure_url;
  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image. Please try again."],
      },
    };
  }

  try {
    await prisma.blog.create({
      data: {
        title: result.data.title,
        slug: result.data.slug,
        metaDescription: result.data.metaDescription,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser.id,
      },
    });
  } catch (error) {
    return {
      errors: {
        formError: ["Failed to create blog post."],
      },
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
