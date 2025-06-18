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
import { createExperience } from "../../../../actions/experience/create-exp";

const CreateExp = () => {
  const [formState, action, isPending] = useActionState(createExperience, {
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
            Add Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label>Company</Label>
              <Input type="text" name="company" placeholder="Company Name" />
              {formState.errors.company && (
                <span className="text-red-600 text-sm py-4">
                  {formState.errors.company}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Job title</Label>
              <Input type="text" name="position" placeholder="e.g. Software Engineer" />
              {formState.errors.position && (
                <span className="text-red-600 text-sm">
                  {formState.errors.position}
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
              <Button variant="outline" type="reset" className=" corsur-pointer">Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Add Experience"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateExp;
