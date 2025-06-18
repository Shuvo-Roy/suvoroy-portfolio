'use client';

import { Prisma } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

type ProjectType = Prisma.ProjectGetPayload<{
  include: {
    author: {
      select: {
        name: true;
        email: true;
        imageUrl: true;
      };
    };
    techStacks: {
      select: {
        name: true;
      };
    };
  };
}>;

type ProjectsProps = {
  projects: ProjectType[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className='container max-w-7xl mx-auto py-20'>
      <h1 className='text-4xl font-bold mb-4 text-center'>My Projects</h1>
      <p className='text-lg text-slate-900 dark:text-white mb-24 text-center'>Some of my projects you can see</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project) => (
          <article key={project.title} className='bg-white dark:bg-dark/50 rounded-lg shadow-lg p-4'>
            <div className='relative aspect-video mb-4 rounded-lg overflow-hidden'>
              <Image
                src={project.image || ""}
                alt={project.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width:1200px) 50vw,33vw'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
            <p className='text-gray-600 dark:text-gray-200 mb-4'>{project.description}</p>
            <div className='flex flex-wrap gap-2 mb-4'>
              {project.techStacks.map((tech) => (
                <span key={tech.name} className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'>
                  {tech.name}
                </span>
              ))}
            </div>
            <div className='flex gap-4 mt-2'>
              <Link
                href={project.link || ""}
                target='_blank'
                className='flex items-center gap-2 text-green-800 hover:text-primary transition-colors'
              >
                <FaExternalLinkAlt className='w-5 h-5' />
                <span>Live Demo</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
