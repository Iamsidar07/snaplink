import { AreaChart } from "@tremor/react";
import { cn } from "@/lib/utils";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function Chart({ data, className, yAxisWidth = 60 }) {
  const tdata = new Array(50).fill(0).map((item, i) => ({
    index: "youtube",
    clicks: Math.floor(Math.random() * 500),
  }));
  return (
    <AreaChart
      className={cn("min-h-72 h-full", className)}
      data={tdata}
      index="index"
      categories={["clicks"]}
      colors={["green"]}
      valueFormatter={dataFormatter}
      yAxisWidth={yAxisWidth}
    />
  );
}
