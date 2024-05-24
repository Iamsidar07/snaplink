import config from "@/config";
import { formatDistance } from "date-fns";
export const validateURL = (url) => {
  const urlPattern = new RegExp(
    /^(?:http|https?):\/\/(?:\w+\.)+\w{2,}(?:\/\S*)?$/i,
  );

  return urlPattern.test(url);
};

export function constructMetadata({
  title = "Simple and Fast URL 🔗 Shortner",
  description = "Snaplink is a free tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}) {
  return {
    title,
    description,
    openGraph: {
      url: "https://snaplink-xegc.vercel.app",
      type: "website",
      title,
      description,
      images: [
        {
          url: image,
          width: 1024,
          height: 1024,
        },
      ],
      locale: "en-US",
      siteName: "Snaplink",
    },
    twitter: {
      card: "summary_large_image",
      domain: "snaplink-xegc.vercel.app",
      url: "https://snaplink-xegc.vercel.app/",
      title,
      description,
      images: [image],
      creator: "@iamsidar07",
    },
    icons,
    metadataBase: new URL("https://snaplink-xegc.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const numberFormatter = Intl.NumberFormat("en-US", {});

export const dataFormatter = (number) => Intl.NumberFormat("us").format(number).toString()

export const convertToTimeAgo = (date) => {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  });
};

export const handleDeviceDetection = (userAgent) => {
  let device = "Unknown";
  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
    userAgent,
  );
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
    userAgent,
  );

  if (isMobile) {
    device = "Mobile";
  } else if (isTablet) {
    device = "Tablet";
  } else {
    device = "Desktop";
  }
  return device;
};
export const getLocation = async () => {
  const res = await fetch(config.locationEndpoint);
  const data = await res.json();
  return data;
};
