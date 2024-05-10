"use client";
import React from "react";
import Chart from "./Chart";
import { cn } from "@/lib/utils";

const RenderChart = ({ data, className, type = "bar" }) => {
  return (
    <Chart
      data={data}
      type={type}
      className={cn("min-h-fit sm:min-h-72", className)}
    />
  );
};

export default RenderChart;
