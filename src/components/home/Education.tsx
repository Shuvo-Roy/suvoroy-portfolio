import { Prisma } from "@prisma/client";
import React from "react";

type EducationType = Prisma.EducationGetPayload<{
  include: {
    author: {
      select: {
        name: true;
      };
    };
  };
}>;
type EducationProps = {
  educations: EducationType[];
};

export default function Education({ educations }: EducationProps) {
  return (
    <section className="mb-16">
      <h2 className="section-title">Education</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{edu.field}</h2>
            <p className="text-slate-800 dark:text-white">{edu.degree}</p>
            <div className="">
              <p className="text-primary text-md mb-2">
                {edu.institution}
              </p>
              <p className="text-sm">
                  {edu.startDate.toDateString()} -{" "}
                  {edu.endDate?.toDateString() || "Present"}
                </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
