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
import DeleteEduBtn from '@/components/dashboard-components/educations/DeleteEducation';

const EducationPage = async () => {
  const educationList = await prisma.education.findMany({
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
});

  return (
    <div className="">
      <div className="flex items-center justify-between my-8 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm p-4">
        <h2 className="text-sm md:text-xl">Add Education Qualifications</h2>
        <Button variant="ghost" className="cursor-pointer">
          <Link href='/dashboard/educations/create'>
          <Plus className="w-8 h-8 text-green-700" /></Link>
        </Button>
      </div>

      <div className="my-2 mx-4 dark:bg-slate-800 bg-slate-200 rounded-sm">
        {!educationList.length ? (
          <CardContent>No education records found.</CardContent>
        ) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {educationList.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.field}</TableCell>
                    <TableCell>{edu.startDate ? new Date(edu.startDate).toDateString() : 'N/A'}</TableCell>
                    <TableCell>
                       {edu.endDate ? new Date(edu.endDate).toDateString() : 'Ongoing'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/educations/${edu.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <DeleteEduBtn educationId={edu.id} />
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

export default EducationPage;
