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

// initial state

type CreateBlogFormState = {
  errors: {
    title?: string[];
    category?: string[];
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
  const result = editBlogSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // user validations
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formError: ["You have to register first"],
      },
    };
  }
  // existing blog
  const exsistingBlog = await prisma.blog.findUnique({
    where: { id: blogId },
  });
  if (!exsistingBlog) {
    return {
      errors: { formError: ["Blog not found"] },
    };
  }

  // find user for store data
  const exsistingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!exsistingUser || exsistingBlog.authorId !== exsistingUser.id) {
    return {
      errors: {
        formError: ["User not found. Please register"],
      },
    };
  }

  let imageUrl = exsistingBlog.featuredImage;

  //start edting blogs
  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile && imageFile.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // upload image on cloudinary
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

  //error image

  //final create

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["server error"],
        },
      };
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
