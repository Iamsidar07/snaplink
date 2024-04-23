"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import revalidate from "@/app/actions";

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
    onSuccess: async ({ shortUrl }) => {
      setShortenUrl(shortUrl);
      revalidate({ tag: "urls" });
    },
    onError: (error) => {
      return toast({
        title: error.response.data || "Something went wrong!",
        description: "Please try again after some time.",
        variant: "destructive",
      });
    },
  });
  const copyShortUrl = async () => {
    await navigator.clipboard.writeText(shortenUrl);
    toast({
      description: "🔗 Url copied to your clipboard.",
    });
  };

  return (
    <div className="mt-6 bg-background w-full p-6 border rounded text-center relative">
      <Image
        src={"/try-it.png"}
        alt="try it"
        width={382}
        height={419}
        className="w-20 obkect-contain absolute -right-2 -top-14 sm:-right-12 sm:-top-16 pointer-events-none dark:invert"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="flex flex-col sm:flex-row items-stretch gap-2"
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
          className="mt-4 cursor-pointer text-sm underline-offset-2 flex items-center justify-center underline gap-2 "
          onClick={copyShortUrl}
        >
          <CopyIcon className="w-4 h-4 text-blue-500" />
          <span className="headline text-xs md:text-sm font-bold">
            {shortenUrl}
          </span>
        </div>
      )}
      <p className="mt-6 text-xs sm:text-sm text-muted-foreground">
        ShortURL is a free tool to shorten URLs and generate short links URL
        shortener allows to create a shortened link making it easy to share
      </p>
    </div>
  );
};

export default ShortUrlForm;
