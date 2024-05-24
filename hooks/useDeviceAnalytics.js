"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDeviceAnalytics = () => {
  const results = useQuery({
    queryKey: ["devicesInfo"],
    queryFn: async () => {
      const res = await axios.get("/api/clicks/byDevices");
      return res.data;
    },
  });
  return results;
};
export default useDeviceAnalytics;
