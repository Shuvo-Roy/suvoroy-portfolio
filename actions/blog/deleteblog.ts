"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteBlog = async (blogId: string) => {
  await prisma.blog.delete({
    where: { id: blogId },
  });

  revalidatePath("/dashboard");
};
