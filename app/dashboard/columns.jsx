"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Copy, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import RenderQrCode from "@/components/RenderQrCode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const deleteUrl = async (url) => {
  const res = await axios.delete("/api/url", { url });
  console.log(res.data);
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shortUrl",
    header: "Short Link",
    cell: ({ row }) => {
      const url = row.original.shortUrl;
      return (
        <div className="flex items-center gap-2">
          <Copy
            className="w-4 h-4 cursor-pointer text-blue-500 active:scale-90"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          />
          <span>{url}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "originalUrl",
    header: "Original Link",
    cell: ({ row }) => {
      const url = row.original.originalUrl;
      return (
        <div className="flex items-center gap-2">
          <Copy
            className="w-4 h-4 cursor-pointer text-blue-500 active:scale-90"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          />
          <span>{url}</span>
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
          <Dialog>
            <DialogTrigger>
              <RenderQrCode url={history.shortUrl} className="" />
            </DialogTrigger>
            <DialogContent className="py-12 flex items-center justify-center">
              <RenderQrCode
                url={history.shortUrl}
                className="w-full h-full max-w-sm mx-auto"
                isCustom
              />
            </DialogContent>
          </Dialog>
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

      return date.toLocaleDateString("en-US");
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { shortUrl } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => navigator.clipboard.writeText(history.id)}
            >
              <Trash
                onClick={() => deleteUrl(shortUrl)}
                className="w-4 h-4 mr-2"
              />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
