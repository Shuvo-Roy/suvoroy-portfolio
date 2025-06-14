'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Prisma } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useTransition } from 'react';
import { deleteBlog } from '../../../actions/deleteblog';
import { Badge } from '@/components/ui/badge';

type RecentBlogsProps = {
  blogs: Prisma.BlogGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const RecentBlogs: React.FC<RecentBlogsProps> = ({ blogs }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Article</CardTitle>
          <Button className="text-muted-foreground" size="sm" variant="ghost">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!blogs.length ? (
        <CardContent>No Blogs</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="rounded-full bg-green-100 text-green-800"
                    >
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/blogs/${blog.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton blogId={blog.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentBlogs;

// ----- DELETE BUTTON -----
type DeleteButtonProps = {
  blogId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ blogId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          await deleteBlog(blogId);
        });
      }}
    >
      <Button disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
};
