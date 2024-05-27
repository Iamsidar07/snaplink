"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { dataFormatter } from "@/lib/utils";
import useUserLinks from "@/hooks/useUserLinks";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const TopPerformingLinks = () => {
  const { data } = useUserLinks();
  const topLinks = data?.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const chartdata = topLinks?.map((item) => {
    const url = new URL(item.originalUrl);
    const domain = url.host;
    return {
      domain,
      "Total Clicks": dataFormatter(item.clicks),
    };
  });
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Links</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={chartdata}>
              <Bar dataKey="TotalClicks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformingLinks;
