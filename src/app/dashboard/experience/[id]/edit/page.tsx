import EditExperience from '@/components/dashboard-components/experience/EditExp';
import { prisma } from '@/lib/prisma';
import React from 'react';

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) {
    return <h1>Experience record not found for this ID</h1>;
  }

  return (
    <div>
      <EditExperience experience={experience} />
    </div>
  );
};

export default Page;
