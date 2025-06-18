import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Prisma } from "@prisma/client";
import { Github, Link2 } from "lucide-react";

type ProjectCardProps = {
  projects: Prisma.ProjectGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
      techStacks: true;
    };
  }>[];
};

const Projects: React.FC<ProjectCardProps> = async ({projects }) => {
  
  if (!projects || projects.length === 0) {
    return <p>No projects found</p>;
  }

  return (
    <section className="py-20 container max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="bg-white dark:bg-dark/50 rounded-lg shadow-lg p-4"
          >
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src={project.image || ""}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw,33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStacks.map((tech: { id: string; name: string }) => (
                <span
                  key={tech.id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
            <div className="flex justify-between gap-4 mt-2">
              <Link
                href={project.link || "#"}
                target="_blank"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <Link2 className="w-5 h-5" />
                <span>Live</span>
              </Link>
              <Link
                href={project.link || "#"}
                target="_blank"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>Github</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
