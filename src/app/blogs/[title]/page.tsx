import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BlogDetailPage from "@/components/home/BlogDetailPage";
import { notFound } from "next/navigation";

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug[0];

  const blog = await prisma.blog.findUnique({
    where: { slug },
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

// Page component
export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug[0];

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, email: true, imageUrl: true },
      },
    },
  });

  if (!blog) notFound();

  return <BlogDetailPage blog={blog} />;
}
