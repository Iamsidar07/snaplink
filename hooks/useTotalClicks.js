"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTotalClicks = () => {
  const result = useQuery({
    queryKey: ["totalClicks"],
    queryFn: async () => {
      const res = await axios.get("/api/clicks/totalClicks");
      return res.data;
    },
  });
  return result;
};

export default useTotalClicks;
