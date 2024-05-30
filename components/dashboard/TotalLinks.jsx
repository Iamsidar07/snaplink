"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { LinkIcon } from "lucide-react";
import useUserLinks from "@/hooks/useUserLinks";
import { numberFormatter } from "@/lib/utils";

const TotalLinks = () => {
  const { data: links = [] } = useUserLinks();
  return (
    <Card className="">
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
        <LinkIcon className="h-8 w-8 text-gray-300" />
        <h3 className="text-2xl font-semibold">
          {numberFormatter.format(links.length)}
        </h3>
        <p className="">Total Links</p>
      </CardContent>
    </Card>
  );
};

export default TotalLinks;
