"use client";
import useUserLinks from "@/hooks/useUserLinks";
import React, { Suspense, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { AreaChart } from "@tremor/react";
import { dataFormatter } from "@/utils";
import { format } from "date-fns";
import { BarChart, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_PERIOD_DATA = [
  {
    label: "Last hour",
    value: new Date(Date.now() - 3600000),
  },
  {
    label: "Last 24 hours",
    value: new Date(Date.now() - 86400000),
  },
  {
    label: "Last 7 days",
    value: new Date(Date.now() - 604800000),
  },
  {
    label: "Last 30 days",
    value: new Date(Date.now() - 2592000000),
  },
];
const Analytics = () => {
  const { data, isLoading } = useUserLinks();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState(TIME_PERIOD_DATA.at(-1));
  const countsByDate = {};
  data?.forEach((item) => {
    item.dailyClicks.forEach((click) => {
      const date = click.date.split("T")[0];
      countsByDate[date] = (countsByDate[date] || 0) + click.count;
    });
  });

  const filteredCountsByDate = Object.fromEntries(
    Object.entries(countsByDate).filter(([date, count]) => {
      console.log([date, count], timePeriod.value);
      return new Date(date) > timePeriod.value;
    }),
  );

  const chartdata = Object.entries(filteredCountsByDate).map(
    ([date, count]) => {
      const formattedDate = format(new Date(date), "EEE, MMM d");
      return {
        date: formattedDate,
        clicks: count,
      };
    },
  );
  const totalClicks = Object.entries(filteredCountsByDate).reduce(
    (prev, [_, count]) => prev + count,
    0,
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Analytics</h2>
        <div className="w-[200px] text-gray-500 relative">
          <div
            onClick={() =>
              setIsOptionsOpen((prevIsOptionsOpen) => !prevIsOptionsOpen)
            }
            className={cn(
              "flex items-center justify-between border rounded px-3 py-1.5 text-gray-800 cursor-pointer group",
              {
                "shadow ring-2 ring-offset-2 ring-gray-200": isOptionsOpen,
              },
            )}
          >
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <p className="text-sm">{timePeriod.label}</p>
            </div>
            <ChevronDown
              className={cn("w-4 h-4 transition-transform", {
                "rotate-180": isOptionsOpen,
              })}
            />
          </div>
          {isOptionsOpen && (
            <div className="z-10 absolute bg-background inset-x-0 top-14 border ring-2 ring-offset-2 ring-gray-200 rounded space-y-2 px-3 py-1.5 text-sm">
              {TIME_PERIOD_DATA.map((period, i) => (
                <p
                  onClick={() => {
                    setTimePeriod(period);
                    setIsOptionsOpen(false);
                  }}
                  className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                  key={i}
                >
                  {period.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-1">
            <h2 className="text-lg lg:text-3xl font-bold">
              {dataFormatter(totalClicks)}
            </h2>
            <BarChart className="w-5 h-5 text-gray-600" />
          </div>

          <p className="uppercase text-gray-500">total clicks</p>
        </CardHeader>
        <CardContent>
          <AreaChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={["clicks"]}
            colors={["indigo"]}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
