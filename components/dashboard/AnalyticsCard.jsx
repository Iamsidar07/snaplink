import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AreaChart } from "@tremor/react";
import { BarChart, Loader } from "lucide-react";
import { dataFormatter, numberFormatter } from "@/lib/utils";

const AnalyticsCard = ({
  totalClicks,
  data,
  isTotalClicksLoading,
  isClicksOverTimeLoading,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          {isTotalClicksLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <h2 className="text-lg lg:text-3xl font-bold">
              {numberFormatter.format(totalClicks)}
            </h2>
          )}
          <BarChart className="text-lg lg:text-3xl  text-gray-200" />
        </div>
        <p className="uppercase text-gray-500">total clicks</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6 min-h-80">
        {isClicksOverTimeLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <AreaChart
            data={data}
            index="date"
            categories={["clicks"]}
            colors={["yellow"]}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            showGridLines={false}
            autoMinValue
            showXAxis={false}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
