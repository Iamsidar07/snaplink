import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AreaChart } from "@tremor/react";
import { BarChart, Loader } from "lucide-react";
import { dataFormatter, numberFormatter } from "@/lib/utils";

const AnalyticsCard = ({ totalClicks, data, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          <h2 className="text-lg lg:text-3xl font-bold">
            {numberFormatter.format(totalClicks)}
          </h2>
          <BarChart className="text-lg lg:text-3xl  text-gray-200" />
        </div>
        <p className="uppercase text-gray-500">total clicks</p>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="grid place-items-center w-full h-full">
            <Loader className="animate-spin w-5 h-5" />
          </div>
        ) : (
          <AreaChart
            data={data}
            index="date"
            categories={["clicks"]}
            colors={["yellow"]}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
            showGridLines={false}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
