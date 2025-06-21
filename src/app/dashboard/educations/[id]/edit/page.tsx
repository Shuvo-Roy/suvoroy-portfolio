import EditEducationPage from '@/components/dashboard-components/educations/EditEducationPage';
import { prisma } from '@/lib/prisma';
import React from 'react';

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const education = await prisma.education.findUnique({
    where: { id },
  });

  if (!education) {
    return <h1>Education record not found for this ID</h1>;
  }

  return (
    <div>
      <EditEducationPage education={education} />
    </div>
  );
};

export default Page;
