"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy } from "lucide-react";
import Link from "next/link";
import config from "@/config";
import { convertToTimeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = [
  {
    accessorKey: "shortUrl",
    header: "Short Link",
    cell: ({ row }) => {
      const { shortUrl } = row.original;
      const url = `${config.domain}/${shortUrl}`;
      return (
        <div className="flex items-center gap-2 group">
          <Copy
            className="w-4 h-4 cursor-pointer text-blue-500 active:scale-90"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          />
          <Link
            href={url}
            target="_blank"
            className="group-hover:underline group-hover:underline-offset-2 truncate max-w-xs"
          >
            {url}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "originalUrl",
    header: "Original Link",
    cell: ({ row }) => {
      const { originalUrl } = row.original;
      const origin = new URL(originalUrl).origin;
      return (
        <div className="flex items-center gap-2 group">
          <Avatar className="w-8 h-8">
            <AvatarImage
              alt={origin}
              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${origin}`}
              className="object-contain"
            />
            <AvatarFallback className="uppercase">{origin[0]}</AvatarFallback>
          </Avatar>
          <Link
            href={originalUrl}
            target="_blank"
            className="group-hover:underline group-hover:underline-offset-2 truncate max-w-xs"
          >
            {originalUrl}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const history = row.original;
      const date = new Date(history.date);

      return <p className="text-nowrap"> {convertToTimeAgo(date)}</p>;
    },
  },
];
