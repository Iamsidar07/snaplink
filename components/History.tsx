import { History } from "@/types";
import HistoryCard from "./HistoryCard";
import HistoryAction from "./HistoryAction";
interface HistoryProps {
  historyData: History[];
}
const HistoryComponent = ({ historyData }: HistoryProps) => {
  return (
    <div className="min-w-full">
      <div className="flex items-stretch justify-between p-2">
        <h3 className="text-lg sm:text-2xl">History ({historyData?.length})</h3>
        <HistoryAction />
      </div>
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
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-lg font-medium"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" text-left bg-[#0B101B]">
                    {historyData.map(
                      ({
                        short_url,
                        _id,
                        clicks,
                        createdAt,
                        original_url,
                        userId,
                        qrcode,
                      }) => (
                        <HistoryCard
                          qrcode={qrcode}
                          key={_id}
                          userId={userId}
                          _id={_id}
                          clicks={clicks}
                          createdAt={createdAt}
                          original_url={original_url}
                          short_url={short_url}
                        />
                      ),
                    )}
                  </tbody>
                </table>
              ) : (
                <p>History Empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
