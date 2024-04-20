"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import OgPreview from "./OgPreview";

const OgFormAndPreview = ({ shortUrl }) => {
  const [og, setOg] = useState({
    title: "OpenGraph - Preview Social Media Share and Generate Metatags",
    description:
      "OpenGraph is the easiest way to preview and generate open graph meta tags for any website.",
    image: "/og.png",
  });
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files?.length > 0) return;
    const image = files[0];
    const url = URL.createObjectURL(image);
    setOg((pre) => ({ ...pre, image: url }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start my-12 gap-6">
      <form className="flex flex-col gap-3 border rounded-xl h-fit p-2 md:p-4 w-full max-w-xl shadow-lg">
        <div className="space-y-3">
          <Label htmlFor={"title"}>Title</Label>
          <Input
            value={og.title}
            onChange={(e) =>
              setOg((pre) => ({ ...pre, title: e.target.value }))
            }
            placeholder="Your title..."
            id="title"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            value={og.description}
            onChange={(e) =>
              setOg((pre) => ({ ...pre, title: e.target.value }))
            }
            placeholder="Write your description..."
            id="description"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor={"image"}>Image</Label>
          <Input
            onChange={handleImageChange}
            type="file"
            placeholder="Your title..."
            accept="image/*"
            id="image"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <OgPreview shortUrl={shortUrl} {...og} />
    </div>
  );
};

export default OgFormAndPreview;
