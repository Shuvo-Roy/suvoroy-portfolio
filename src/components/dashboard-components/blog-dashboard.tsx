import Link from "next/link";
import React from "react";
import { FileText, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { prisma } from "@/lib/prisma";
import RecentBlogs from "./recent-blogs";


const BlogDashboard = async () => {
  const [blogs, totalPost] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.blog.count(),
  ]);

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <p>Manage content and analytics</p>
        </div>
        <Link href="/dashboard/blogs/create">
          <Button>
            <PlusCircle className="h-5 w-5 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Articles</CardTitle>
            <FileText className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPost}</div>
            <p className="text-sm text-muted-foreground mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <RecentBlogs blogs={blogs} />
    </main>
  );
};

export default BlogDashboard;
