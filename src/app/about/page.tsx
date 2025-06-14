import { BackendIcons, DatabaseIcons, FrontendIcons, Programing } from "@/contents/icon";
import Image from "next/image";
import React from "react";
import { FaCode } from "react-icons/fa6";

const About = () => {
  return (
    <div className="container max-w-7xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
      <section className="mb-16">
        <p className="text-lg text-secondary max-w-3xl mx-auto text-center">
          Skilled web developer with strong UI/UX design and full-stack
          development using Node.js, Express.js, and MongoDB. Eager to
          contribute to your innovative projects and bring my passion for
          building exceptional user experiences.
        </p>
      </section>

      {/* skills section */}

      <section className="mb-16">
        <h2 className="section-title">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* Programming  */}
          <div className="bg-white dark:bg-dark/50 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-center">Programming Language</h3>
            <div className="flex gap-6 flex-wrap">
            {Object.entries(Programing).map(([name, src]) => (
              <div key={name} className="flex flex-col items-center">
                <Image src={src} alt={name} width={40} height={40} />
              </div>
            ))}
          </div>
          </div>
          {/* frontend  */}
          <div className="bg-white dark:bg-dark/50 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Frontend</h3>
            <div className="flex gap-6 flex-wrap">
            {Object.entries(FrontendIcons).map(([name, src]) => (
              <div key={name} className="flex flex-col items-center">
                <Image src={src} alt={name} width={40} height={40} />
              </div>
            ))}
          </div>
          </div>
          {/* backendend  */}
          <div className="bg-white dark:bg-dark/50 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Backend</h3>
            <div className="flex gap-6 flex-wrap">
            {Object.entries(BackendIcons).map(([name, src]) => (
              <div key={name} className="flex flex-col items-center">
                <Image src={src} alt={name} width={40} height={40} />
              </div>
            ))}
          </div>
          </div>
          {/* Database  */}
          <div className="bg-white dark:bg-dark/50 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Database</h3>
            <div className="flex gap-6 flex-wrap">
            {Object.entries(DatabaseIcons).map(([name, src]) => (
              <div key={name} className="flex flex-col items-center">
                <Image src={src} alt={name} width={40} height={40} />
              </div>
            ))}
          </div>
          </div>
          
        </div>
      </section>

      {/* experiences section  */}
      <section className="mb-16">
        <h2 className="section-title">Experiences</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Executive - Website Maintenance</h3>
          <p className="text-primary mb-2">Company Name - 2025 - Present</p>
          <ul className="text-secondary space-y-2 list-disc list-inside">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
          </ul>
          </div>
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Executive - Website Maintenance</h3>
          <p className="text-primary mb-2">Company Name - 2025 - Present</p>
          <ul className="text-secondary space-y-2 list-disc list-inside">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
          </ul>
          </div>
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Executive - Website Maintenance</h3>
          <p className="text-primary mb-2">Company Name - 2025 - Present</p>
          <ul className="text-secondary space-y-2 list-disc list-inside">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, at.</li>
          </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
