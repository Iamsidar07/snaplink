import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AreaChart } from "@tremor/react";
import { BarChart } from "lucide-react";
import { dataFormatter, numberFormatter } from "@/lib/utils";

const AnalyticsCard = ({ totalClicks }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          <h2 className="text-lg lg:text-3xl font-bold">
            {numberFormatter.format(totalClicks)}
          </h2>
          <BarChart className="w-5 h-5 text-gray-600" />
        </div>
        <p className="uppercase text-gray-500">total clicks</p>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="h-80"
          data={chartdata}
          index="date"
          categories={["clicks"]}
          colors={["indigo"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
        />
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;

