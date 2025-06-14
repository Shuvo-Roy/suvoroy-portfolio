import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { prisma } from "@/lib/prisma";
import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteProjectBtn from "@/components/dashboard-components/project/DeleteProjectBtn";

const ProjectPage = async () => {
  const [projects, totalProjects] = await Promise.all([
    prisma.project.findMany({
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
    prisma.project.count(),
  ]);
  return (
    <div className="">
      <div className="flex items-center justify-between my-8 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm p-4">
        <div>
          <h2 className="text-sm md:text-xl">Add New Projects</h2>
        </div>
        <div>
          <Link href="/dashboard/projects/create">
            <Button variant={"ghost"} className="cursor-pointer">
              <Plus className="w-8 h-8 text-green-700" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="my-2 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm py-6">
        {!projects.length ? (
          <CardContent>No Projects Found</CardContent>
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
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={"outline"}
                        className="rounded-full bg-green-100 text-green-800"
                      >
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>{project.createdAt.toDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/projects/${project.id}/edit`}>
                          <Button variant={"ghost"} size={"sm"}>
                            Edit
                          </Button>
                        </Link>
                        <DeleteProjectBtn projectId={project.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
