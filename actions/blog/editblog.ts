"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const editBlogSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  metaDescription: z.string().optional(),
  category: z.string().optional(),
  featuredImage: z.any().optional(),
  content: z.string().optional(),
});

type CreateBlogFormState = {
  errors: {
    title?: string[];
    metaDescription?: string[];
    category?: string[];
    slug?: string[];
    featuredImage?: string[];
    content?: string[];
    formError?: string[];
  };
};

export const editBlog = async (
  blogId: string,
  prevState: CreateBlogFormState,
  formData: FormData
): Promise<CreateBlogFormState> => {
  // Validate form data
  const result = editBlogSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    metaDescription: formData.get("metaDescription"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formError: ["You have to register first"],
      },
    };
  }

  // Check if blog exists
  const existingBlog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!existingBlog) {
    return {
      errors: { formError: ["Blog not found"] },
    };
  }

  // Check if user is the blog author
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser || existingBlog.authorId !== existingUser.id) {
    return {
      errors: {
        formError: ["User not found. Please register"],
      },
    };
  }

  // Image upload (if provided)
  let imageUrl = existingBlog.featuredImage;
  const imageFile = formData.get("featuredImage") as File | null;

  if (imageFile && imageFile.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as UploadApiResponse);
              }
            }
          );
          uploadStream.end(buffer);
        }
      );

      if (uploadResponse?.secure_url) {
        imageUrl = uploadResponse.secure_url;
      } else {
        return {
          errors: {
            featuredImage: ["Failed to upload image, try again"],
          },
        };
      }
    } catch (error) {
      return {
        errors: {
          formError: ["Error on uploading image"],
        },
      };
    }
  }

  // Update blog
  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: result.data.title,
        slug: result.data.slug,
        metaDescription: result.data.metaDescription,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
      },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");

    // This won't be reached, but TS wants a return
    return { errors: {} };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    }

    return {
      errors: {
        formError: ["Server error"],
      },
    };
  }
};
