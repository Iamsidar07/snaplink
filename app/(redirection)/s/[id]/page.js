import config from "@/config/config";
import { constructMetadata } from "@/utils";
import { notFound, redirect } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const res = await fetch(`${config.domain}/api/actualUrl?id=${params.id}`);
  const data = await res.json();
  return constructMetadata({
    title: data?.metadata?.title,
    description: data?.metadata?.description,
    image: data?.metadata?.ogCover ?? "/thumbnail.png",
  });
};

const updateClicks = async ({ id }) => {
  const res = await fetch(`${config.domain}/api/actualUrl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

const Page = async ({ params }) => {
  const data = await updateClicks({ id: params.id });
  const targetUrl = data?.actualUrl;
  if (targetUrl) {
    redirect(targetUrl);
  }
  notFound();
};

export default Page;
