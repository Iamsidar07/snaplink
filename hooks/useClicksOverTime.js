"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClicksOverTime = () => {
  const result = useQuery({
    queryKey: ["clicksOverTime"],
    queryFn: async () => {
      const res = await axios.get("/api/clicks/overTime");
      return res.data;
    },
  });
  return result;
};

export default useClicksOverTime;
