"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import useTotalClicks from "@/hooks/useTotalClicks";
import { TIME_PERIOD_DATA } from "@/constants";
import AnalyticsCard from "./AnalyticsCard";

const Analytics = () => {
  const { data: totalClicks = 0 } = useTotalClicks();
  const { data: clicksOverTime = [] } = useTotalClicks();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState(TIME_PERIOD_DATA.at(-1));
  const data = clicksOverTime;
  console.log({ data, clicksOverTime, totalClicks })
  const filteredClicksOverTime = data.filter((clickLog) => {
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
        <div className="w-[200px]  relative">
          <div
            onClick={() =>
              setIsOptionsOpen((prevIsOptionsOpen) => !prevIsOptionsOpen)
            }
            className={cn(
              "flex items-center justify-between border rounded px-3 py-1.5  cursor-pointer group",
              {
                shadow: isOptionsOpen,
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
            <div className="z-10 absolute bg-background inset-x-0 top-14 border rounded space-y-2 px-3 py-1.5 text-sm">
              {TIME_PERIOD_DATA.map((period, i) => (
                <p
                  onClick={() => {
                    setTimePeriod(period);
                    setIsOptionsOpen(false);
                  }}
                  className="cursor-pointer  transition-colors"
                  key={i}
                >
                  {period.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <AnalyticsCard totalClicks={totalClicks} data={chartdata} />
    </div>
  );
};

export default Analytics;
