// app/blogs/[title]/page.tsx

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BlogDetailPage from "@/components/home/BlogDetailPage";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.title },
    select: { title: true, metaDescription: true },
  });

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog could not be located.",
    };
  }

  return {
    title: blog.title,
    description: blog.metaDescription || "A blog post from Suvo Roy.",
  };
}

export default async function Page({
  params,
}: {
  params: { title: string };
}) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.title },
    include: {
      author: {
        select: { name: true, email: true, imageUrl: true },
      },
    },
  });

  if (!blog) notFound();

  return <BlogDetailPage blog={blog} />;
}
