"use client";
import useDeviceAnalytics from "@/hooks/useDeviceAnalytics";
import BarChart from "./BarChart";
import React from "react";

const DeviceAnalytics = () => {
  const { data = {} } = useDeviceAnalytics();
  return <BarChart name="Devices" data={data} />;
};

export default DeviceAnalytics;
