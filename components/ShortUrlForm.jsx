"use client";
import React, { useState } from "react";
import config from "@/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import revalidate from "@/actions";

const ShortUrlForm = ({ className }) => {
  const { toast } = useToast();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/shortUrls", {
        originalUrl,
      });
      return res.data;
    },
    onSuccess: async (shortUrl) => {
      setShortUrl(shortUrl);
      setOriginalUrl("");
      revalidate({ tag: "urls" });
    },
    onError: (error) => {
      console.log(error);
      return toast({
        title: error.response.data ?? "Something went wrong!",
        description: "Please try again after some time.",
        variant: "destructive",
      });
    },
  });
  const copyShortUrl = async () => {
    await navigator.clipboard.writeText(config.domain + "/" + shortUrl);
    toast({
      description: "🔗 Url copied to your clipboard.",
    });
  };

  return (
    <div className={cn("w-full text-center relative", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="flex flex-col sm:flex-row items-stretch gap-2"
      >
        <Input
          disabled={isPending}
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter the link here"
        />
        <Button disabled={isPending} type="submit">
          Shorten URL
        </Button>
      </form>
      {shortUrl && (
        <div
          className="mt-4 cursor-pointer text-sm underline-offset-2 flex items-center justify-center underline gap-2 "
          onClick={copyShortUrl}
        >
          <CopyIcon className="w-4 h-4 text-blue-500" />
          <span className="headline text-xs md:text-sm font-bold">
            {`${config.domain}/${shortUrl}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default ShortUrlForm;
