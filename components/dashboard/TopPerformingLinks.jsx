"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BarChart } from "@tremor/react";
import { dataFormatter } from "@/lib/utils";
import useUserLinks from "@/hooks/useUserLinks";
import { Loader } from "lucide-react";

const TopPerformingLinks = () => {
  const { data, isLoading } = useUserLinks();
  const topLinks = data?.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const chartdata = topLinks?.map((item) => {
    const url = new URL(item.originalUrl);
    const domain = url.host;
    return {
      domain,
      "Total Clicks": item.clicks,
    };
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Links</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground flex items-center justify-center h-full">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <BarChart
              data={chartdata}
              index="domain"
              categories={["Total Clicks"]}
              colors={["yellow"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
              showGridLines={false}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformingLinks;
