import OgForm from "@/components/OgForm";
import RenderChart from "@/components/RenderChart";
import RenderQrCode from "@/components/RenderQrCode";
import config from "@/config/config";
import { constructMetadata, formatDate } from "@/utils";
import { AreaChartIcon, WandSparkles } from "lucide-react";
import { notFound } from "next/navigation";
export const metadata = constructMetadata({
  title: "Insights | Snaplink",
});

const fetchData = async (id) => {
  const res = await fetch(`${config.domain}/api/url/${id}`, {
    next: {
      tags: ["urls"],
    },
  });
  return res.json();
};

const Page = async ({ params }) => {
  const id = params.id;
  const data = await fetchData(id);

  if (!data?._id) notFound();
  const formattedData = data?.dailyClicks?.map((item) => {
    const date = new Date(item.date);
    return {
      index: formatDate(date),
      clicks: item.count,
    };
  });

  return (
    <div className="w-full h-full max-w-7xl mx-auto pb-6">
      <div className="flex items-center gap-2 mb-4 underline underline-offset-4">
        <h3 className="md:text-lg font-recursive">01. Insights</h3>
        <AreaChartIcon className="w-4 h-4 inline-block text-orange-500" />
      </div>
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 ">
        <div className="w-full border rounded-lg">
          <RenderChart
            data={formattedData}
            className={"h-64 sm:h-full w-full "}
          />
        </div>
        <div className="w-full md:max-w-sm border p-2 rounded-lg">
          <RenderQrCode isCustom {...data} className="w-full h-full" />
        </div>
      </div>
      <div className="flex items-center gap-2 my-3 md:my-6 underline underline-offset-4">
        <h3 className="md:text-lg font-recursive">02. Customization</h3>
        <WandSparkles className="w-4 h-4 inline-block text-orange-400" />
      </div>

      <OgForm {...data} />
    </div>
  );
};
export default Page;
