"use client";
import { useMutation } from "@tanstack/react-query";
import { Eye, Loader, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import axios from "axios";
import revalidate from "@/app/actions";
import Image from "next/image";

const Card = ({ actualUrl, shortUrl, clicks, _id }) => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/api/url/${id}`);
      return res.data;
    },
    onSuccess: () => {
      revalidate({ tag: "urls" });
    },
    onError: (err) => {
      console.error(err);
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
  const newUrl = new URL(actualUrl);
  const origin = newUrl.origin;
  return (
    <div className="border border-border rounded-2xl w-full max-w-sm p-3 sm:p-6 transition-transform hover:shadow-lg hover:scale-105 hover:border-primary ">
      <div className="flex items-center gap-2">
        <Image
          className="rounded"
          width={30}
          height={30}
          alt="logo"
          src={`${origin}/favicon.ico`}
        />
        <Link
          href={`/dashboard/url/${_id}`}
          className="truncate hover:underline hover:underline-offset-2"
        >
          {actualUrl}
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
            onClick={() => mutate(_id)}
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
