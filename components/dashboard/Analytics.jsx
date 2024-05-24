"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AreaChart } from "@tremor/react";
import { dataFormatter } from "@/utils";
import { format } from "date-fns";
import { BarChart, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const TIME_PERIOD_DATA = [
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
  const getTotalClicks = async () => {
    const res = await axios.get("/api/clicks/totalClicks");
    return res.data;
  };
  const getClicksOverTime = async () => {
    const res = await axios.get("/api/clicks/overTime");
    return res.data;
  };

  const [{ data: totalClicks = 0 }, { data: clicksOverTime = [] }] = useQueries(
    {
      queries: [
        { queryKey: ["totalClicks"], queryFn: getTotalClicks },
        { queryKey: ["clicksOverTime"], queryFn: getClicksOverTime },
      ],
    },
  );
  let data = clicksOverTime;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState(TIME_PERIOD_DATA.at(-1));
  const filteredClicksOverTime = data?.filter((clickLog) => {
    return new Date(clickLog.time) > timePeriod.value;
  });

  const chartdata = filteredClicksOverTime?.map(({ clicks, time }) => {
    const formattedDate =
      timePeriod.label !== TIME_PERIOD_DATA[0].label
        ? format(new Date(time), "EEE, MMM d")
        : format(new Date(time), "h:mm a");
    return {
      date: formattedDate,
      clicks,
    };
  });

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg lg:text-3xl">Analytics</h2>

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
