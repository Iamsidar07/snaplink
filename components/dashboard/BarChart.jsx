"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { BarList } from "@tremor/react";
import { cn } from "@/lib/utils";
import { ANALYTICS_EMOJIS, COUNTRY_FLAGS } from "@/constants";

const BarChart = ({ name = "", data }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(null);
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setCurrentActiveTab(Object.keys(data)[0]);
    }
  }, [data]);

  const options = Object.keys(data);
  const BARLIST_DATA = Object.entries(data[currentActiveTab] || {}).map(
    ([item, itemCount]) => {
      if (currentActiveTab === "country" || currentActiveTab === "city") {
        console.log({ name, item });
        const [city, country] = item.split(", ");
        return {
          name: currentActiveTab === "country" ? country : city,
          value: itemCount,
          icon: () => <p className="mr-2">{COUNTRY_FLAGS.get(country)}</p>,
        };
      }
      console.log(item);
      return {
        name: itemCount._id,
        value: itemCount.count,
        icon: () => (
          <p className="mr-2">
            {ANALYTICS_EMOJIS[currentActiveTab][itemCount._id] ?? "❓"}
          </p>
        ),
      };
    },
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-cente justify-between ">
          <h3>{name}</h3>
          <div className="flex items-center gap-3 ">
            {options.map((option, i) => {
              return (
                <button
                  onClick={() => setCurrentActiveTab(option)}
                  key={option}
                  className={cn(
                    "px-3 py-1 hover:bg-gray-100 text-xs capitalize",
                    {
                      "bg-gray-100 font-semibold": currentActiveTab === option,
                    },
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <BarList data={BARLIST_DATA} className="" />
      </CardContent>
    </Card>
  );
};

export default BarChart;
