"use server";

import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export const editProject = async (prevState: any, formData: FormData) => {
  const id = formData.get("id")?.toString();
  if (!id) {
    return { errors: { id: "Project ID is required" } };
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      techStacks: true,
    },
  });

  if (!project) {
    return { errors: { id: "Project not found" } };
  }

  const title = formData.get("title")?.toString();
  const link = formData.get("link")?.toString();
  const github = formData.get("github")?.toString();
  const description = formData.get("description")?.toString();
  const techstack = formData.get("techstack")?.toString();
  const file = formData.get("featuredImage") as File;

  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required";
  if (!link) errors.link = "Link is required";
  if (!github) errors.github = "Github link is required";
  if (!description) errors.description = "Description is required";

  // Validate techstack presence and non-empty after trimming
  const techNames = techstack
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean) || [];

  if (techNames.length === 0) {
    errors.techstack = "At least one tech stack is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  let imageUrl;
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        link,
        github,
        description,
        ...(imageUrl ? { image: imageUrl } : {}),
        techStacks: {
          set: [], // clear existing relations
          connectOrCreate: techNames.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });

    return { success: true };
  } catch (err) {
    
    return { errors: { general: "Update failed" } };
  }
};
