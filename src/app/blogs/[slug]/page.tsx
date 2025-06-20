import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import BlogDetailPage from '@/components/home/BlogDetailPage'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params

  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: { title: true, metaDescription: true },
  })

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'This blog could not be located.',
    }
  }

  return {
    title: blog.title,
    description: blog.metaDescription || 'A blog post from Suvo Roy.',
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, email: true, imageUrl: true },
      },
    },
  })

  if (!blog) notFound()

  return <BlogDetailPage blog={blog} />
}
