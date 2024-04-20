"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { cn } from "@/lib/utils";

const Statistics = ({ data, className }) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <Line
        data={data}
        style={{ widht: "100%" }}
        options={{
          title: {
            display: true,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default Statistics;
