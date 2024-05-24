"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserLinks = () => {
  const { userId } = useAuth();
  const result = useQuery({
    queryKey: ["allShortUrls", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/shortUrls?userId=${userId}`);
      return res.data;
    },
  });
  return result;
};
export default useUserLinks;
