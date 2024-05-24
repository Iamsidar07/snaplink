"use client";
import { deviceDetect } from "react-device-detect";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Loader } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getLocation, handleDeviceDetection } from "@/utils"

const RedirectToDesignationURL = ({ id }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { osName, browserName, userAgent } = deviceDetect();
  const device = handleDeviceDetection(userAgent);
  const [originalUrl, setOriginalUrl] = useState(null);

  const { mutateAsync: updateClickLog } = useMutation({
    mutationFn: async (clickLog) => {
      const res = await axios.post(`/api/clicks`, clickLog);
      return res.data;
    },
  });

  useMemo(async () => {
    const { country, city } = await getLocation();
    const referrer = searchParams.get("ref");
    const clickLogInfo = {
      urlId: id,
      country,
      city,
      os: osName,
      browser: browserName,
      device,
      referrer,
    };
    console.log("userinfo:", clickLogInfo);
    try {
      const data = await updateClickLog(clickLogInfo);
      setOriginalUrl(data?.originalUrl);
    } catch (error) {
      console.error("Error updating click:", error);
    }
  }, [browserName, osName, id, device, updateClickLog, searchParams]);

  useEffect(() => {
    if (originalUrl) {
      router.push(originalUrl); // Redirect only when URL is available
    }
  }, [originalUrl, router]);

  return (
    <MaxWidthWrapper
      className={"pt-12 space-y-4 grid place-content-center place-items-center"}
    >
      <Loader className="w-5 h-5 animate-spin" />
      <h1>You are redirecting to your designation</h1>
    </MaxWidthWrapper>
  );
};

export default RedirectToDesignationURL;
