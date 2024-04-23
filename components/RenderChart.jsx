"use client";
import React from "react";
import Chart from "./Chart";
import { cn } from "@/lib/utils";

const RenderChart = ({ data, className }) => {
  return (
    <Chart data={data} className={cn("min-h-fit sm:min-h-72", className)} />
  );
};

export default RenderChart;
