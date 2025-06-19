import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteExpBtn from '@/components/dashboard-components/experience/DeleteExp';


const ExperiencePage = async () => {
  const expList = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    })
  return (
    <div className="">
      <div className="flex items-center justify-between my-8 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm p-4">
        <h2 className="text-sm md:text-xl">Add Experience</h2>
        <Button variant="ghost" className="cursor-pointer">
          <Link href='/dashboard/experience/create'>
          <Plus className="w-8 h-8 text-green-700" /></Link>
        </Button>
      </div>

      <div className="my-2 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm">
        {!expList.length ? (
          <CardContent>No experience records found.</CardContent>
        ) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {expList.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>{exp.position}</TableCell>
                    <TableCell>{exp.startDate.toDateString()}</TableCell>
                    <TableCell>
                      {exp.endDate ? exp.endDate.toDateString() : 'Ongoing'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/experience/${exp.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <DeleteExpBtn experienceId={exp.id} />
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

export default ExperiencePage;
