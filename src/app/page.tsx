import Hero from "../components/home/Hero";
import { prisma } from '@/lib/prisma';
import Projects from "@/components/home/Projects";
import Blogs from "@/components/home/Blogs";
import HeroBottom from "@/components/home/HeroBottom";
import { heroBottomIcons } from "@/lib/herobottom";

export default async function Home() {  
  const [blogs, projects] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: { techStacks: true, author: true },
    }),
  ]);
  return (
    <>
      <Hero  />
      <HeroBottom icons={heroBottomIcons}/>
      <Projects projects={projects} />
      <Blogs blogs={blogs}/>
    </>
  );
}
