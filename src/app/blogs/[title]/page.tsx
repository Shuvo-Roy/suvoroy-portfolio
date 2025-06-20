// page.tsx
import { getBlogData } from '@/lib/blogFetcher';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogDetailPage from '@/components/home/BlogDetailPage';

type PageProps = {
  params: { title: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogData(params.title);
  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'This blog could not be located.',
    };
  }
  return {
    title: blog.title,
    description: blog.metaDescription || 'A blog post from Suvo Roy.',
  };
}

export default async function Page({ params }: PageProps) {
  const blog = await getBlogData(params.title);
  if (!blog) notFound();
  return <BlogDetailPage blog={blog} />;
}
