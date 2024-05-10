import { auth } from "@clerk/nextjs";
import React from "react";
import { fetData } from "../page";
import { notFound } from "next/navigation";
import RenderChart from "@/components/RenderChart";

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
      <h2 className="font-bold text-lg lg:text-3xl">Analytics</h2>

      <RenderChart
        data={formattedData}
        className="h-64 sm:h-[450px]"
        type={"area"}
      />
    </div>
  );
};

export default page;
