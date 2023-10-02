"use client";
import { History } from "@/types";
import HistoryCard from "./HistoryCard";
import { useEffect, useState } from "react";

const History = () => {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errrMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (loading) return;
        setErrorMsg("");
        setLoading(true);
        const res = await fetch(`/api/all`);
        const data = await res.json();
        console.log(data);
        setHistoryData(data.result);
      } catch (error: any) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col w-full mt-12">
      <div className="-m-1.5 overflow-x-auto no-scrollbar">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            {historyData?.length > 0 ? (
              <table className="min-w-full rounded-lg bg-secondary ">
                <thead className="border-b border-secondary rounded-lg ">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-6 py-5 text-left text-lg font-medium"
                    >
                      Short Link
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-left text-lg font-medium"
                    >
                      Original Link
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-left text-lg font-medium whitespace-nowrap"
                    >
                      OR Codes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-left text-lg font-medium"
                    >
                      Clicks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-left text-lg font-medium"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className=" text-left bg-[#0B101B]">
                  {historyData.map(
                    (
                      {
                        short_url,
                        _id,
                        clicks,
                        date,
                        original_url,
                        userId,
                        qrcode,
                      },
                      index,
                    ) => (
                      <HistoryCard
                        qrcode={qrcode}
                        key={_id}
                        userId={userId}
                        _id={_id}
                        clicks={clicks}
                        date={date}
                        original_url={original_url}
                        short_url={short_url}
                      />
                    ),
                  )}
                </tbody>
              </table>
            ) : (
              <p>Register to see your history</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;