import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import BlogDetailPage from '@/components/home/BlogDetailPage';

interface PageProps {
  params: {
    title: string;
  };
}

// ✅ Generate metadata correctly
export async function generateMetadata(
  {params}: PageProps
): Promise<Metadata> {
  const { title } = params;

  // No need to await `params` — it's synchronous
  const blog = await prisma.blog.findUnique({
    where: { slug: title },
    select: {
      title: true,
      metaDescription: true,
    },
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

// ✅ Page Component
export default async function Page({ params }: PageProps) {
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
    return <h1 className="text-center py-20 text-2xl">Blog not found</h1>;
  }

  return <BlogDetailPage blog={blog} />;
}
