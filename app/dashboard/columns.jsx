"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy } from "lucide-react";
import RenderQrCode from "@/components/RenderQrCode";
import Link from "next/link";
import Image from "next/image";
import { convertToTimeAgo } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "shortUrl",
    header: "Short Link",
    cell: ({ row }) => {
      const { shortUrl: url, id } = row.original;
      return (
        <div className="flex items-center gap-2 group">
          <Copy
            className="w-4 h-4 cursor-pointer text-blue-500 active:scale-90"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          />
          <Link
            href={`/dashboard/links/${id}`}
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
      const url = row.original.originalUrl;
      const newUrl = new URL(row.original.originalUrl);
      const origin = newUrl.origin;

      return (
        <div className="flex items-center gap-2 group">
          <Image
            className="rounded"
            width={30}
            height={30}
            alt="logo"
            src={`${origin}/favicon.ico`}
          />

          {url}
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
    accessorKey: "qrCode",
    header: "QR Code",
    cell: ({ row }) => {
      const history = row.original;
      return (
        <>
          <div className="w-12">
            {" "}
            <RenderQrCode {...history} _id={history.id} className="w-20" />
          </div>
        </>
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

      return convertToTimeAgo(date);
    },
  },
];
