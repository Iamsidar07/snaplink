"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { BarList } from "@tremor/react";
import { cn } from "@/lib/utils";
import { ANALYTICS_EMOJIS, COUNTRY_FLAGS } from "@/constants";
import { buttonVariants } from "../ui/button";
import { Loader } from "lucide-react";

const BarChart = ({ name = "", data, isLoading }) => {
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

        const [city, country] = item.split(", ");
        return {
          name: currentActiveTab === "country" ? country : city,
          value: itemCount,
          icon: () => <p className="mr-2">{COUNTRY_FLAGS.get(country)}</p>,
        };
      }
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
            {options.map((option) => {
              return (
                <button
                  onClick={() => setCurrentActiveTab(option)}
                  key={option}
                  className={buttonVariants({
                    size: "xs",
                    className: "px-2 py-1",
                    variant: currentActiveTab === option ? "default" : "ghost",
                  })}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-24">
        {isLoading ? (
          <div className="grid place-items-center w-full h-full">
            <Loader className="animate-spin w-5 h-5" />
          </div>
        ) : (
          <BarList data={BARLIST_DATA} color="zinc" />
        )}
      </CardContent>
    </Card>
  );
};

export default BarChart;
