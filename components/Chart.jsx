import { AreaChart, BarChart } from "@tremor/react";
import { cn } from "@/lib/utils";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function Chart({
  data,
  className,
  yAxisWidth = 60,
  type = "bar",
}) {
  return (
    <>
      {type === "bar" ? (
        <BarChart
          data={data}
          index="domain"
          categories={["clicks"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
          onValueChange={(v) => console.log(v)}
        />
      ) : (
        <AreaChart
          className="h-80"
          data={data}
          index="domain"
          categories={["clicks"]}
          colors={["indigo"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
        />
      )}
    </>
  );
}
