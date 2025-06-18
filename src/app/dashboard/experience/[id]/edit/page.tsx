
import EditEducationPage from '@/components/dashboard-components/educations/EditEducationPage';
import EditExperience from '@/components/dashboard-components/experience/EditExp';
import { prisma } from '@/lib/prisma';
import React from 'react';

type EditExperienceParams = {
  params: { id: string };
};

const Page: React.FC<EditExperienceParams> = async ({ params }) => {
  const { id } = params;

  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) return <h1>Experience record not found for this ID</h1>;

  return (
    <div>
      <EditExperience experience={experience} />
    </div>
  );
};

export default Page;
