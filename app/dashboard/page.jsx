import Card from "@/components/Card";
import ShortUrlForm from "@/components/ShortUrlForm";
import config from "@/config/config";
import { constructMetadata } from "@/utils";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { DataTable } from "./data-table";
import RenderQrCode from "@/components/RenderQrCode";
import { columns } from "@/app/dashboard/columns";
import RenderChart from "@/components/RenderChart";

export const metadata = constructMetadata({
  title: "Dashboard | Snaplink",
});

const fetData = async ({ userId }) => {
  const res = await fetch(`${config.domain}/api/url?userId=${userId}`);
  return await res.json();
};
export default async function Page() {
  const { userId } = auth();
  const data = await fetData({ userId });
  if (!data) notFound();
  const tableData = data?.map(
    ({ _id, shortUrl, actualUrl, clicks, createdAt, dailyClicks }) => ({
      id: _id,
      shortUrl,
      originalUrl: actualUrl,
      clicks,
      date: createdAt,
      qrCode: <RenderQrCode value={shortUrl} />,
      dailyClicks,
    }),
  );

  const formattedData = data?.map((item) => {
    const hostname = new URL(item.actualUrl).hostname;
    return {
      index: hostname,
      clicks: item.clicks,
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-32">
      <div className="max-w-4xl mx-auto mb-12">
        <ShortUrlForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((card) => (
          <Card {...card} key={card._id} />
        ))}
      </div>
      <DataTable columns={columns} data={tableData} />
      <RenderChart data={formattedData} className="h-64 sm:h-[450px]" />
    </div>
  );
}
