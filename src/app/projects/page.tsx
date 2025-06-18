import { prisma } from '@/lib/prisma';
import Projects from './Projects';


export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
  orderBy: { createdAt: 'desc' },
  include: {
    author: {
      select: {
        name: true,
        email: true,
        imageUrl: true,
      },
    },
    techStacks: {
      select: {
        name: true,
      },
    },
  },
});

  return <Projects projects={projects} />;
}
