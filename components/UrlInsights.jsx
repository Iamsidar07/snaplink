"use client";
import React from "react";
import { AreaChartIcon, Filter, WandSparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils";
import Chart from "./Chart";
import RenderQrCode from "./RenderQrCode";
import MyLoader from "./Loader";
import OgForm from "./OgForm";

const UrlInsights = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await fetch(`/api/url/${id}`);
      return await res.json();
    },
  });
  if (!data && !isLoading) {
    return notFound();
  }
  const formattedData = data?.dailyClicks?.map((item) => {
    const date = new Date(item.date);
    return {
      index: formatDate(date),
      clicks: item.count,
    };
  });

  return (
    <div className="w-full h-full max-w-[1440px] mx-auto pb-32">
      {data ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="md:text-lg">Insights</h3>
            <AreaChartIcon className="w-4 h-4 inline-block text-orange-500" />
          </div>
          <div className="flex flex-col md:flex-row md:items-stretch gap-6 ">
            <div className="w-full border rounded-lg ">
              <Chart data={formattedData} className={"h-full"} />
            </div>
            <div className="w-full max-w-sm border p-2 rounded-lg">
              <RenderQrCode isCustom {...data} className="w-full h-full" />
            </div>
          </div>

          <div className="flex items-center gap-2 my-3 md:my-6">
            <h3 className="md:text-lg">Customization</h3>
            <WandSparkles className="w-4 h-4 inline-block text-orange-400" />
          </div>

          <OgForm {...data} />
        </div>
      ) : (
        isLoading && <MyLoader />
      )}
    </div>
  );
};

export default UrlInsights;
