"use client";
import React from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import CreateLink from "@/components/CreateLink";
import useUserLinks from "@/hooks/useUserLinks";

const Page = () => {
  const { data = [], isLoading } = useUserLinks();
  const tableData = data?.map(
    ({ _id, shortUrl, originalUrl, clicks, createdAt }) => ({
      id: _id,
      shortUrl,
      originalUrl,
      clicks,
      date: createdAt,
    }),
  );

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg lg:text-3xl">Recent Links</h2>
        <CreateLink />
      </div>

      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default Page;
