"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import OgPreview from "./OgPreview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Loader } from "lucide-react";
import axios from "axios";

const OgFormAndPreview = ({ shortUrl, id }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["saveMetada"],
    mutationFn: async (formdata) => {
      const res = await axios.patch(`/api/url/${id}`, formdata);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([id]);
    },
    onError: (err) => {
      console.error(err);
      toast({
        title: "Failed to save metadata.",
        action: (
          <ToastAction altText="retry" onClick={mutate}>
            Retry
          </ToastAction>
        ),
      });
    },
  });
  const [og, setOg] = useState({
    title: "OpenGraph - Preview Social Media Share and Generate Metatags",
    description:
      "OpenGraph is the easiest way to preview and generate open graph meta tags for any website.",
    image: "/og.png",
    file: null,
  });
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files?.length > 0) return;
    const image = files[0];
    const url = URL.createObjectURL(image);
    setOg((pre) => ({ ...pre, image: url, file: image }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (!og.title || !og.description || !og.file) return;
    const formData = new FormData();
    formData.append("title", og.title);
    formData.append("description", og.description);
    formData.append("file", og.file);

    mutate(formData);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start my-12 gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border rounded-xl h-fit p-2 md:p-4 w-full max-w-xl shadow-lg"
      >
        <div className="space-y-3">
          <Label htmlFor={"title"}>Title</Label>
          <Input
            value={og.title}
            name={"title"}
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
            name="description"
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
            name="ogCover"
            onChange={handleImageChange}
            type="file"
            placeholder="Your title..."
            accept="image/*"
            id="image"
          />
        </div>
        <Button disabled={isPending} type="submit">
          {isPending ? <Loader className="w-4 h-4 animate-spin" /> : null}
          Submit
        </Button>
      </form>
      <OgPreview shortUrl={shortUrl} {...og} />
    </div>
  );
};

export default OgFormAndPreview;
