"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { createProject } from "../../../../actions/project/create-projects";

const CreateProject = () => {
  const [formState, action, isPending] = useActionState(createProject, {
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
            Create New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="text-md">Name</Label>
              <Input type="text" name="title" placeholder="Project Name" />
              {formState.errors.title && (
                <span className="text-red-600 text-sm py-4">
                  {formState.errors.title}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-md">Link</Label>
              <Input type="text" name="link" placeholder="Project Link" />
              {formState.errors.link && (
                <span className="text-red-600 text-sm">
                  {formState.errors.link}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-md">Github</Label>
              <Input type="text" name="link" placeholder="Github Link" />
              {formState.errors.github && (
                <span className="text-red-600 text-sm">
                  {formState.errors.github}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-md">Description</Label>
              <textarea
                name="description"
                placeholder="Blog meta description"
                className="w-full p-3 border rounded-lg"
              />
              {formState.errors.description && (
                <span className="text-red-600 text-sm ">
                  {formState.errors.description}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-md">Tech Stack</Label>
              <Input
                type="text"
                name="techstack"
                placeholder="e.g. React, Node.js, PostgreSQL"
              />
              {formState.errors.techstack && (
                <span className="text-red-600 text-sm">
                  {formState.errors.techstack}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="featuredImage" className="flex flex-col gap-2">
                Featured Image
              </Label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant={"outline"}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Publish"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;
