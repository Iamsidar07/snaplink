"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserLinks = () => {
  const result = useQuery({
    queryKey: ["allShortUrls"],
    queryFn: async () => {
      const res = await axios.get(`/api/shortUrls`);
      return res.data;
    },
  });
  return result;
};
export default useUserLinks;
