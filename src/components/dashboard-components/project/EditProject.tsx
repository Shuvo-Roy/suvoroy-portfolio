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
import { editProject } from "../../../../actions/project/update-project";

interface TechStack {
  id: string;
  name: string;
}
interface Project {
  id: string;
  title: string;
  link: string | null;
  github: string | null;
  featuredImage: string | null;
  description: string;
  techStacks?: TechStack[];
}

interface UpdateProjectProps {
  project: Project;
  onCancel?: () => void;
}

const UpdateProject = ({ project, onCancel }: UpdateProjectProps) => {
  const [title, setTitle] = useState(project.title ?? "");
  const [link, setLink] = useState(project.link ?? "");
  const [github, setGithub] = useState(project.github ?? "");
  const [featuredImage, setFeaturedImage] = useState(
    project.featuredImage ?? ""
  );
  const [description, setDescription] = useState(project.description ?? "");
  const [techstack, setTechstack] = useState(
    project.techStacks ? project.techStacks.map((t) => t.name).join(", ") : ""
  );

  const [formState, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      return await editProject(_prevState, formData);
    },
    { errors: {} }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("id", project.id);
    formData.set("title", title);
    formData.set("link", link);
    formData.set("github", github);
    formData.set("description", description);
    formData.set("techstack", techstack);

    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Update Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="text-md">Name</Label>
              <Input
                type="text"
                name="title"
                placeholder="Project Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {formState.errors && formState.errors.title && (
                <span className="text-red-600 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-md">Link</Label>
              <Input
                type="text"
                name="link"
                placeholder="Project Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              {formState.errors && formState.errors.link && (
                <span className="text-red-600 text-sm">
                  {formState.errors.link}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-md">Github</Label>
              <Input
                type="text"
                name="github"
                placeholder="Github Link"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
              {formState.errors && formState.errors.github && (
                <span className="text-red-600 text-sm">
                  {formState.errors.github}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-md">Description</Label>
              <textarea
                name="description"
                placeholder="Project description"
                className="w-full p-3 border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {formState.errors && formState.errors.description && (
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
                value={techstack}
                onChange={(e) => setTechstack(e.target.value)}
              />
              {formState.errors && formState.errors.techstack && (
                <span className="text-red-600 text-sm">
                  {formState.errors.techstack}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="featuredImage" className="flex flex-col gap-2">
                Featured Image (Upload new to replace)
              </Label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  if (onCancel) {
                    onCancel();
                  } else if (typeof window !== "undefined") {
                    window.history.back();
                  }
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProject;
