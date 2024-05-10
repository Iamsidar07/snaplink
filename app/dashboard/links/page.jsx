import React from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import RenderQrCode from "@/components/RenderQrCode";
import { auth } from "@clerk/nextjs";
import { fetData } from "../page";

const page = async () => {
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

  return (
    <div className="p-5">
      <h2 className="font-bold text-lg lg:text-3xl">Recent Links</h2>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default page;
