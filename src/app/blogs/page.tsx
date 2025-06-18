import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function Blogs() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
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

  return (
    <section className="py-20 container max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Latest Blog Posts
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="bg-white dark:bg-dark/50 rounded-lg shadow-md"
          >
            <Image
              src={blog.featuredImage || ""}
              alt={blog.title}
              width={500}
              height={300}
              className="object-cover rounded-lg"
            />
            <Link href={`/blogs/${blog.slug}`}>
              <h3 className="text-xl font-semibold hover:text-primary transition-colors px-2 py-3 uppercase">
                {blog.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 space-x-4 justify-between">
              <span className="flex items-center justify-end p-4">
                <Calendar className="mr-2" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button variant="outline">
            <Link
          href="/blogs"
        >
          View All Posts
        </Link>
        </Button>
        
      </div>
    </section>
  );
}
