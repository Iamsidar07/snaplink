"use client";
import React from "react";
import BarChart from "./BarChart";
import useLinkAnalytics from "@/hooks/useLinkAnalytics";

const LocationAnalytics = () => {
  const { data: locationsInfo = {}, isLoading } = useLinkAnalytics();
  console.log(locationsInfo);
  return (
    <BarChart name="Location" data={locationsInfo} isLoading={isLoading} />
  );
};

export default LocationAnalytics;
