"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ShortUrlForm from "@/components/ShortUrlForm";
import RenderQrCode from "@/components/RenderQrCode";
import { useQuery } from "@tanstack/react-query";
import MyLoader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
export default function Page() {
  const { toast } = useToast();
  async function getData() {
    const res = await fetch(`/api/url`);
    const data = await res.json();
    console.log({ data });
    const formattedData = data?.map(
      ({ _id, shortUrl, actualUrl, clicks, createdAt }) => ({
        id: _id,
        shortUrl,
        originalUrl: actualUrl,
        clicks,
        date: createdAt,
        qrCode: <RenderQrCode value={shortUrl} />,
      }),
    );
    return formattedData?.length > 0 ? formattedData : [];
  }

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: getData,
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

  return (
    <div className="container">
      <div className="max-w-lg mx-auto mb-12">
        <ShortUrlForm />
      </div>
      {isLoading ? <MyLoader /> : null}
      {data?.length ? <DataTable columns={columns} data={data} /> : null}
    </div>
  );
}
