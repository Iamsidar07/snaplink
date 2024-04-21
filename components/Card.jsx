"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Loader, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import axios from "axios";

const Card = ({ originalUrl, shortUrl, clicks, id }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/api/url/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
    },
    onError: (err) => {
      console.error(err);
      //TODO: spell check later
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
        action: (
          <ToastAction altText="try again" onClick={() => mutate(id)}>
            Try again
          </ToastAction>
        ),
      });
    },
  });
  const newUrl = new URL(originalUrl);
  const origin = newUrl.origin;
  return (
    <div className="border rounded-2xl w-full max-w-sm p-3 sm:p-6 group hover:border-black transition-transform hover:shadow-lg hover:scale-105 ">
      <div className="flex items-center gap-2">
        <img
          className="rounded"
          width={30}
          height={30}
          alt="logo"
          src={`${origin}/favicon.ico`}
        />
        <Link
          href={`/url/${id}`}
          className="truncate hover:underline hover:underline-offset-2"
        >
          {originalUrl}
        </Link>
      </div>

      <Link
        href={shortUrl}
        target="_blank"
        className="truncate mt-4 text-zinc-500 text-sm block"
      >
        {shortUrl}
      </Link>

      <div className="flex items-center gap-1.5 text-zinc-500 justify-end w-full">
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Trash
            onClick={() => mutate(id)}
            className="w-4 h-4 cursor-pointer active:scale-90"
          />
        )}
        <div className="flex items-center gap-1.5">
          <Eye className="w-4 h-4 " />
          <span>{clicks}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
