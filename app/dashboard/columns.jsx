"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy } from "lucide-react";
import RenderQrCode from "@/components/RenderQrCode";
import Link from "next/link";
import Image from "next/image";
import { convertToTimeAgo } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
      console.log({ origin });
      return (
        <div className="flex items-center gap-2 group">
          <Image
            className="rounded"
            width={30}
            height={30}
            alt="logo"
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${origin}`}
          />
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
    accessorKey: "qrCode",
    header: <p className="text-nowrap">Qr Code</p>,
    cell: ({ row }) => {
      const url = row.original.shortUrl;
      return (
        <Dialog>
          <DialogTrigger className="w-12">
            <RenderQrCode url={url} />
          </DialogTrigger>
          <DialogContent className="pt-12 max-w-sm md:max-w-lg">
            <RenderQrCode url={url} />
          </DialogContent>
        </Dialog>
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
