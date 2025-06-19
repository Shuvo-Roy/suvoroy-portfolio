import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type BlogDetailsProps = {
  blog: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    author: {
      name: string;
      email: string;
      imageUrl: string | null;
    };
  };
};

const BlogDetailPage: React.FC<BlogDetailsProps> = ({ blog }) => {
  return (
    <div className="min-h-screen bg-background py-14">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">
                web development
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={blog.author.imageUrl || ""} />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm">{blog.createdAt.toDateString()}</p>
              </div>
            </div>
          </header>
          <section
            className="mb-12 max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </main>
    </div>
  );
};

export default BlogDetailPage;
