import { auth } from "@clerk/nextjs";
import React from "react";
import { fetData } from "../page";
import { notFound } from "next/navigation";
import RenderChart from "@/components/RenderChart";
import Analytics from "@/components/Analytics";

const page = async () => {
  const { userId } = auth();
  const data = await fetData({ userId });
  if (!data) notFound();

  const formattedData = data?.map((item) => {
    const domain = new URL(item.actualUrl).host;
    return {
      domain,
      clicks: item.clicks,
    };
  });
  return (
    <div className="p-5">
      <Analytics />
    </div>
  );
};

export default page;
