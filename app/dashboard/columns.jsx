"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, BarChart2, Copy } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import RenderQrCode from "@/components/RenderQrCode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Statistics from "@/components/Statistics";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "shortUrl",
    header: "Short Link",
    cell: ({ row }) => {
      const url = row.original.shortUrl;
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
            className="group-hover:underline group-hover:underline-offset-2 truncate"
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
          <img
            className="rounded"
            width={30}
            height={30}
            alt="logo"
            src={`${origin}/favicon.ico`}
          />

          <Link
            href={url}
            target="_blank"
            className="group-hover:underline group-hover:underline-offset-2 truncate"
          >
            {url}
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
    header: "QR Code",
    cell: ({ row }) => {
      const history = row.original;
      return (
        <>
          <Dialog>
            <DialogTrigger>
              <RenderQrCode {...history} _id={history.id} className="" />
            </DialogTrigger>
            <DialogContent className="py-12 flex items-center justify-center">
              <RenderQrCode
                {...history}
                _id={history.id}
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
];
