"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { createEducation } from "../../../../actions/education/create-edu";

const CreateEducation = () => {
  const [formState, action, isPending] = useActionState(createEducation, {
    errors: {},
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Add Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label>Institution</Label>
              <Input type="text" name="institution" placeholder="University Name" />
              {formState.errors.institution && (
                <span className="text-red-600 text-sm py-4">
                  {formState.errors.institution}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Degree</Label>
              <Input type="text" name="degree" placeholder="e.g. B.Sc, M.Tech" />
              {formState.errors.degree && (
                <span className="text-red-600 text-sm">
                  {formState.errors.degree}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Field of Study</Label>
              <Input type="text" name="field" placeholder="e.g. Computer Science" />
              {formState.errors.field && (
                <span className="text-red-600 text-sm">
                  {formState.errors.field}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <Input type="date" name="startDate" />
              {formState.errors.startDate && (
                <span className="text-red-600 text-sm">
                  {formState.errors.startDate}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <Input type="date" name="endDate" />
              {/* endDate can be optional */}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <textarea
                name="description"
                placeholder="Any notes or highlights..."
                className="w-full p-3 border rounded-lg"
              />
              {formState.errors.description && (
                <span className="text-red-600 text-sm">
                  {formState.errors.description}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="reset">Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Add Education"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEducation;
