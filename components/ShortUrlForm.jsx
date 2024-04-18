"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { CopyIcon } from "lucide-react";

const ShortUrlForm = () => {
  const { toast } = useToast();
  const [actualUrl, setActualURL] = useState("");
  const [shortenUrl, setShortenUrl] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/shortUrl", {
        url: actualUrl,
      });
      return res.data;
    },
    onSuccess: ({ shortUrl }) => {
      setShortenUrl(shortUrl);
    },
    onError: (error) => {
      return toast({
        title: error.response.data || "Something went wrong!",
        description: "Please try again after some time.",
        variant: "destructive",
      });
    },
  });
  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortenUrl);
    toast({
      description: "🔗 Url copied to your clipboard.",
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="flex items-stretch gap-2"
      >
        <Input
          disabled={isPending}
          value={actualUrl}
          onChange={(e) => setActualURL(e.target.value)}
          placeholder="Enter the link here"
        />
        <Button disabled={isPending} type="submit">
          Shorten URL
        </Button>
      </form>
      {shortenUrl && (
        <div
          className="mt-4 cursor-pointer text-sm underline-offset-2 flex items-center justify-center underline gap-2"
          onClick={copyShortUrl}
        >
          <CopyIcon className="w-4 h-4 text-blue-500" />
          <span className="headline text-xs md:text-sm font-bold">
            {shortenUrl}
          </span>
        </div>
      )}
    </>
  );
};

export default ShortUrlForm;
