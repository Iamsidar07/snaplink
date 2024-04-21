"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ShortUrlForm from "@/components/ShortUrlForm";
import RenderQrCode from "@/components/RenderQrCode";
import Chart from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";
import MyLoader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Card from "@/components/Card";
export default function Page() {
  const { toast } = useToast();
  async function getData() {
    const res = await fetch(`/api/url`);
    const data = await res.json();
    const formattedData = data?.map(
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
    return formattedData?.length > 0 ? formattedData : [];
  }

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: getData,
    retry: true,
    retryDelay: 5,
  });
  if (isError) {
    toast({
      title: "Something went wrong!",
      description: "Please try again later.",
      variant: "destructive",
      action: (
        <ToastAction altText="Try again" onClick={refetch}>
          Try again
        </ToastAction>
      ),
    });
  }
  const formattedData = data?.map((item) => {
    const hostname = new URL(item.originalUrl).hostname.split(".")[1];
    return {
      index: hostname,
      clicks: item.clicks,
    };
  });

  return (
    <div className="container mb-12 sm:mb-32">
      <div className="max-w-4xl mx-auto mb-12">
        <ShortUrlForm />
      </div>
      {isLoading ? <MyLoader /> : null}
      {data?.length > 0 ? (
        <div className="flex items-center gap-4">
          {data.map((card) => (
            <Card {...card} key={card.id} />
          ))}
        </div>
      ) : null}
      {data?.length > 0 ? (
        <div className="space-y-6">
          <Chart data={formattedData} className="h-96" />

          <DataTable columns={columns} data={data} />
        </div>
      ) : null}
    </div>
  );
}
