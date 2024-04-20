"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  BarChart2,
  Copy,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import RenderQrCode from "@/components/RenderQrCode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import Statistics from "@/components/Statistics";

const deleteUrl = async (url) => {
  const res = await axios.delete("/api/url", { url });
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
    accessorKey: "visualize",
    header: "Visualize",
    cell: ({ row }) => {
      const data = row.original.dailyClicks;
      const formattedData = {
        labels: data.map((url) =>
          new Date(url.date).toLocaleDateString("en-US"),
        ),
        datasets: [
          {
            label: "Clicks per day",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
            hoverBorderColor: "rgba(75, 192, 192, 1)",
            data: data.map((url) => url.count),
          },
        ],
      };

      return (
        <Drawer>
          <DrawerTrigger>
            <BarChart2 className="w-4 h-4 active:scale-95" />
          </DrawerTrigger>
          <DrawerContent className="max-h-[75vh] flex flex-col items-center gap-6">
            <DrawerHeader>
              <DrawerTitle>
                Showing Statstics for {row.original.originalUrl}
              </DrawerTitle>
              <DrawerDescription>
                <Statistics data={formattedData} className="h-64 md:h-96" />
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      );
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
