"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLinkAnalytics = () => {
  const results = useQuery({
    queryKey: ["locationsInfo"],
    queryFn: async () => {
      const res = await axios.get("/api/clicks/byLocations");
      return res.data;
    },
  });
  return results;
};
export default useLinkAnalytics;
