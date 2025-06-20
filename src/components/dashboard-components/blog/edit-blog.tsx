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
import { Blog } from "@prisma/client";
import MDEditor from "@uiw/react-md-editor";
import { editBlog } from "../../../../actions/blog/editblog";
import Image from "next/image";

type EditBlogProps = {
  blog: Blog;
};

const EditBlogPage: React.FC<EditBlogProps> = ({ blog }) => {
  const [content, setContent] = useState(blog.content);
  const [formState, action, isPending] = useActionState(
    editBlog.bind(null, blog.id),
    { errors: {} }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                placeholder="Blog title"
                defaultValue={blog.title}
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                name="slug"
                placeholder="Blog slug/url"
                defaultValue={blog.slug}
              />
              {formState.errors.slug && (
                <span className="text-red-600 text-sm">
                  {formState.errors.slug}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <textarea
                name="metaDescription"
                placeholder="Blog meta description"
                className="w-full p-3 border rounded-lg"
                defaultValue={blog.metaDescription ?? ""}
              />
              {formState.errors.metaDescription && (
                <span className="text-red-600 text-sm ">
                  {Array.isArray(formState.errors.metaDescription)
                    ? formState.errors.metaDescription[0]
                    : formState.errors.metaDescription}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                className="flex h-10 w-full rounded-md"
                name="category"
                id="category"
                defaultValue={blog.category}
              >
                <option value={""}>Select Category</option>
                <option value="tech">tech</option>
                <option value="web">web</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
              />
              {blog.featuredImage && (
                <Image
                  src={blog.featuredImage}
                  alt="Featured"
                  width={200}
                  height={96}
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                />
              </div>
              {formState.errors.content && (
                <span className="text-red-600 text-sm">
                  {formState.errors.content[0]}
                </span>
              )}
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

export default EditBlogPage;
