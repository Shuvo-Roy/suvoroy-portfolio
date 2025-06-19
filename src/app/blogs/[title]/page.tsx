import BlogDetailPage from "@/components/home/BlogDetailPage";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

type Params = {
  params: {
    title: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.title },
    select: {
      title: true,
      metaDescription: true,
    },
  });

  if (!blog) {
    return {
      title: "Blog not found",
      description: "",
    };
  }

  return {
    title: blog.title,
    description: blog.metaDescription ?? "Default description for blog",
  };
}

const Page = async ({ params }: Params) => {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.title },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  return <BlogDetailPage blog={blog} />;
};

export default Page;
