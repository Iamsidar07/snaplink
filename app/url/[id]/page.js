"use client";
import MyLoader from "@/components/Loader";
import RenderQrCode from "@/components/RenderQrCode";
import Statistics from "@/components/Statistics";
import {useQuery} from "@tanstack/react-query";
import {notFound} from "next/navigation";
import OgFormAndPreview from "@/components/OgForm";

const Page = ({ params }) => {
  const id = params.id;
  const { data, error, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await fetch(`/api/url/${id}`);
      return await res.json();
    },
  });
  if (!data && !isLoading) {
    return notFound();
  }
  const formattedData = {
    labels: data?.dailyClicks?.map((url) =>
      new Date(url.date).toLocaleDateString("en-US"),
    ),
    datasets: [
      {
        label: "Clicks per day",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: data?.dailyClicks?.map((url) => url.count),
      },
    ],
  };

  return (
    <div className="w-full h-full ">
      {data ? (
        <div>
          <div className="flex flex-col md:flex-row md:items-stretch gap-6 max-w-[1440px] mx-auto">
            <div className="w-full">
              <Statistics data={formattedData} className={"h-full"} />
            </div>
            <div className="w-full !h-[90%] max-w-sm ">
              <RenderQrCode
                isCustom
                url={data.shortUrl}
                fg={data.qrCodeFgColor}
                bg={data.qrCodeBgColor}
                className="w-full "
                id={id}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start my-12 gap-6">
            <OgFormAndPreview id={id} shortUrl={data.shortUrl} />
          </div>
        </div>
      ) : (
        isLoading && <MyLoader />
      )}
    </div>
  );
};
export default Page;
