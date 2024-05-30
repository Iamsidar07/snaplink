"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { ActivityIcon } from "lucide-react";
import useTotalClicks from "@/hooks/useTotalClicks";
import { numberFormatter } from "@/lib/utils";

const TotalClicks = () => {
  const { data: totalClicks = 0 } = useTotalClicks();
  return (
    <Card className="">
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
        <ActivityIcon className="h-8 w-8 text-gray-300" />
        <h3 className="text-2xl font-semibold">
          {numberFormatter.format(totalClicks)}
        </h3>
        <p className="">Clicks</p>
      </CardContent>
    </Card>
  );
};

export default TotalClicks;
