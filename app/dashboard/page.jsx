"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ShortUrlForm from "@/components/ShortUrlForm";
import RenderQrCode from "@/components/RenderQrCode";
import Statistics from "@/components/Statistics";
import { useQuery } from "@tanstack/react-query";
import MyLoader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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
      description: "Please try again latter.",
      variant: "destructive",
      action: (
        <ToastAction altText="Try again" onClick={refetch}>
          Try again
        </ToastAction>
      ),
    });
  }
  const formattedData = {
    labels: data?.map((url) => {
      const originalUrl = new URL(url.originalUrl);
      return originalUrl.hostname;
    }),
    datasets: [
      {
        label: "Total Clicks",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: data?.map((url) => url.clicks),
      },
    ],
  };

  return (
    <div className="container mb-12 sm:mb-32">
      <div className="max-w-4xl mx-auto mb-12">
        <ShortUrlForm />
      </div>
      {isLoading ? <MyLoader /> : null}
      {data?.length > 0 ? (
        <div>
          <DataTable columns={columns} data={data} />
          <Statistics data={formattedData} />
        </div>
      ) : null}
    </div>
  );
}
