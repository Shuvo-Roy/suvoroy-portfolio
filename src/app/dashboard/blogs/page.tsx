import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import RecentBlogs from "@/components/dashboard-components/recent-blogs";
import { prisma } from "@/lib/prisma";

const RecentBlogsPage = async () => {
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
    <div>
      <div className="flex items-center justify-between my-8 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm p-4">
        <h2 className="text-sm md:text-xl">Create New Blog</h2>
        <Link href="/dashboard/blogs/create">
          <Button variant="ghost">
            <Plus className="w-8 h-8 text-green-700" />
          </Button>
        </Link>
      </div>
      <div className=" my-8 mx-4 rounded-sm">
        <RecentBlogs blogs={blogs} />
      </div>
    </div>
  );
};

export default RecentBlogsPage;
