"use client";
import React from "react";
import BarChart from "./BarChart";
import useLinkAnalytics from "@/hooks/useLinkAnalytics";

const LocationAnalytics = () => {
  const { data: locationsInfo = {} } = useLinkAnalytics();
  return <BarChart name="Location" data={locationsInfo} />;
};

export default LocationAnalytics;
