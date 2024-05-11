"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { BarChart } from "@tremor/react";
import { dataFormatter } from "@/utils";
import useUserLinks from "@/hooks/useUserLinks";

const TopPerformingLinks = () => {
  const { data, isLoading } = useUserLinks();
  console.log({ data });
  const topLinks = data?.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const chartdata = topLinks?.map((item) => {
    const url = new URL(item.actualUrl);
    const domain = url.host;
    return {
      domain,
      "Total Clicks": item.clicks,
    };
  });
  return (
    <div className="grid gap-6 lg:grid-cols-2 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Links</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={chartdata}
            index="domain"
            categories={["Total Clicks"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
            onValueChange={(v) => console.log(v)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformingLinks;
