
import EditEducationPage from '@/components/dashboard-components/educations/EditEducationPage';
import { prisma } from '@/lib/prisma';
import React from 'react';

type EditEducationParams = {
  params: { id: string };
};

const Page: React.FC<EditEducationParams> = async ({ params }) => {
  const { id } = await params;

  const education = await prisma.education.findUnique({
    where: { id },
  });

  if (!education) return <h1>Education record not found for this ID</h1>;

  return (
    <div>
      <EditEducationPage education={education} />
    </div>
  );
};

export default Page;
