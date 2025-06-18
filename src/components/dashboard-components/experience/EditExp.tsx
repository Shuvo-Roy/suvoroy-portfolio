"use client";

import React, { FormEvent, useState, startTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateExperience } from "../../../../actions/experience/update-exp";

type ExperienceType = {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
};

type Props = {
  experience: experience;
};

const EditExperience: React.FC<Props> = ({ experience }) => {
  const [formState, setFormState] = useState({ errors: {} });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("id", experience.id); // include ID

    const result = await updateExperience(undefined, formData);

    if (result?.errors) {
      setFormState(result);
    } else {
      router.push("/dashboard/educations");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Edit Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Company Name</Label>
              <Input name="company" defaultValue={experience.company} />
            </div>


            <div>
              <Label>Job Title</Label>
              <Input name="position" defaultValue={experience.position} />
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                name="startDate"
                defaultValue={new Date(experience.startDate)
                  .toISOString()
                  .slice(0, 10)}
              />
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                name="endDate"
                defaultValue={
                  experience.endDate
                    ? new Date(experience.endDate).toISOString().slice(0, 10)
                    : ""
                }
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                defaultValue={experience.description || ""}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditExperience;
