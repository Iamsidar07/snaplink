"use client";
import useDeviceAnalytics from "@/hooks/useDeviceAnalytics";
import BarChart from "./BarChart";
import React from "react";

const DeviceAnalytics = () => {
  const { data = {}, isLoading } = useDeviceAnalytics();
  return <BarChart name="Devices" data={data} isLoading={isLoading} />;
};

export default DeviceAnalytics;
