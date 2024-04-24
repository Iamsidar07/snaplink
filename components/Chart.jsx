import { AreaChart } from "@tremor/react";
import { cn } from "@/lib/utils";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function Chart({ data, className, yAxisWidth = 60 }) {
  return (
    <AreaChart
      className={cn("min-h-72 h-full", className)}
      data={data}
      index="index"
      categories={["clicks"]}
      colors={["green"]}
      valueFormatter={dataFormatter}
      yAxisWidth={yAxisWidth}
    />
  );
}
