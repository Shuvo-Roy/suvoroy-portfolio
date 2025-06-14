import UpdateProject from "@/components/dashboard-components/project/EditProject";
import { prisma } from "@/lib/prisma";
import React from "react";

type EditProjectParams = {
  params: { id: string };
};

const Page: React.FC<EditProjectParams> = async ({ params }) => {
  const { id } = params;

  const projectFromDb = await prisma.project.findUnique({
    where: { id },
    include: { techStacks: true },
  });

  if (!projectFromDb) return <h1>Project not found</h1>;

  const project = {
    ...projectFromDb,
    featuredImage: projectFromDb.image, // map image -> featuredImage
  };
  return (
    <div>
      <UpdateProject project={project} />
    </div>
  );
};

export default Page;
