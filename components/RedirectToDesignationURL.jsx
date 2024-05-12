"use client";
import { deviceDetect } from "react-device-detect";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//FIX:  Request is getting two times.
const handleDeviceDetection = (userAgent) => {
  let device = "Unknown";
  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
    userAgent,
  );
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
    userAgent,
  );

  if (isMobile) {
    device = "Mobile";
  } else if (isTablet) {
    device = "Tablet";
  } else {
    device = "Desktop";
  }
  return device;
};
const getLocation = async () => {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return data;
};

const RedirectToDesignationURL = ({ id }) => {
  const router = useRouter();
  const [url, setUrl] = useState(null);

  const { osName, browserName, userAgent } = deviceDetect();
  const deviceType = handleDeviceDetection(userAgent);
  const { mutateAsync: updateClick, isPending } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axios.post("/api/actualUrl", userInfo);
      return res.data;
    },
  });
  useEffect(() => {
    const handleFetchData = async () => {
      console.log("hello", osName, isPending);
      if (isPending) return;
      console.log("pass");
      const location = await getLocation();
      const userInfo = {
        id,
        location: {
          city: location?.city,
          country: location?.country,
        },
        devices: {
          osName,
          browserName,
          deviceType,
        },
      };
      console.log("userinfo:", userInfo);
      try {
        const data = await updateClick(userInfo);
        setUrl(data?.url);
      } catch (error) {
        console.error("Error updating click:", error);
      }
    };
    handleFetchData();
  }, [id, deviceType, isPending, osName, updateClick, browserName]);

  useEffect(() => {
    if (url) {
      router.push(url); // Redirect only when URL is available
    }
  }, [url, router]);
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
