"use client";

import React, { FormEvent, useState, startTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateEducation } from "../../../../actions/education/update-edu";

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
};

type Props = {
  education: Education;
};

const EditEducationPage: React.FC<Props> = ({ education }) => {
  const [formState, setFormState] = useState({ errors: {} });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("id", education.id); // include ID

    const result = await updateEducation(undefined, formData);

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
          <CardTitle className="text-center text-xl">Edit Education</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Institution</Label>
              <Input name="institution" defaultValue={education.institution} />
            </div>

            <div>
              <Label>Degree</Label>
              <Input name="degree" defaultValue={education.degree} />
            </div>

            <div>
              <Label>Field of Study</Label>
              <Input name="field" defaultValue={education.field} />
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                name="startDate"
                defaultValue={new Date(education.startDate)
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
                  education.endDate
                    ? new Date(education.endDate).toISOString().slice(0, 10)
                    : ""
                }
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                defaultValue={education.description || ""}
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

export default EditEducationPage;
