import RedirectToDesignationURL from "@/components/RedirectToDesignationURL";
import config from "@/config/config";
import { notFound, redirect } from "next/navigation";

// export const generateMetadata = async ({ params }) => {
//   const res = await fetch(`${config.domain}/api/actualUrl?id=${params.id}`);
//   const data = await res.json();
//   const { title, description, ogCover } = data?.metadata;
//   return {
//     title,
//     description,
//     openGraph: {
//       url: `https://snaplink-segc.vercel.app/s/${params.id}`,
//       type: "website",
//       title,
//       description,
//       images: [{ url: ogCover, width: 1024, height: 10234 }],
//       local: "en-US",
//       siteName: "Snaplink",
//     },
//     twitter: {
//       card: "summary_large_image",
//       domain: "snaplink-xegc.vercel.app",
//       url: `https://snaplink-segc.vercel.app/s/${params.id}`,
//       title,
//       description,
//       images: [{ url: ogCover, width: 1024, height: 10234 }],
//       creator: "@iamsidar07",
//     },
//   };
// };

// const updateClicks = async ({ id }) => {
//   const res = await fetch(`${config.domain}/api/actualUrl`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id }),
//   });
//   return await res.json();
// };

const Page = async ({ params }) => {
  const { id } = params;
  // const data = await updateClicks({ id });
  // const targetUrl = data?.actualUrl;
  // if (targetUrl) {
  //   redirect(targetUrl);
  // }
  // notFound();
  return <RedirectToDesignationURL id={id} />;
};

export default Page;
