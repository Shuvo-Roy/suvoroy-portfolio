import { Prisma } from "@prisma/client";
import React from "react";

type ExperienceType = Prisma.ExperienceGetPayload<{
  include: {
    author: {
      select: {
        name: true;
      };
    };
  };
}>;

type ExperienceProps = {
  experience: ExperienceType[];
};

export default function ExperienceCard({ experience }: ExperienceProps) {
  return (
    <section className="mb-16">
      <h2 className="section-title">Experiences</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>

            <p className="text-primary mb-2">
              {exp.company} — {formatDate(exp.startDate)} -{" "}
              {exp.endDate ? formatDate(exp.endDate) : "Present"}
            </p>
              <p className="text-primary text-sm">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
