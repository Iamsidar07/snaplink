"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { ActivityIcon, Loader } from "lucide-react";
import useTotalClicks from "@/hooks/useTotalClicks";
import { numberFormatter } from "@/lib/utils";

const TotalClicks = () => {
  const { data: totalClicks = 0, isLoading } = useTotalClicks();
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
        <ActivityIcon className="h-8 w-8 text-gray-300" />
        {isLoading ? (
          <Loader className="animate-spin text-muted-foreground" />
        ) : (
          <h3 className="text-2xl font-semibold">
            {numberFormatter.format(totalClicks)}
          </h3>
        )}
        <p>Clicks</p>
      </CardContent>
    </Card>
  );
};

export default TotalClicks;
