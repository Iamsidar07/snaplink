"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
} from "../ui/table";
import { convertToTimeAgo } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import useUserLinks from "@/hooks/useUserLinks";

const RecentLinks = () => {
  const { data: links = [], isLoading } = useUserLinks();

  console.log({ links, isLoading, hello: links.slice(0, 5) });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent Links {links.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Link</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.slice(0, 5).map((link) => (
              <TableRow key={link.createdAt}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Link
                      className="truncate font-medium text-gray-900 dark:text-gray-50 max-w-xs"
                      href={link.originalUrl}
                    >
                      {link.originalUrl}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-50">
                  {link.clicks}
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400 text-nowrap">
                  {convertToTimeAgo(new Date(link.createdAt))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentLinks;
