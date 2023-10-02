"use client";
import { History } from "@/types";
import { AiOutlineCopy } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import Link from "next/link";

const HistoryCard = ({
  _id,
  clicks,
  date,
  original_url,
  short_url,
  qrcode,
}: History) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleUrlCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 700);
  };

  const getFaviconUrl = (url: string) => {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;
    const protocol = urlObject.protocol;
    const faviconUrl = `${protocol}//${hostname}/favicon.ico`;

    return faviconUrl ? faviconUrl : "/qr.png";
  };

  return (
    <tr key={_id} className=" hover:bg-secondary duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 max-w-sm">
        <div className="flex items-center gap-2">
          <span className="truncate">{short_url}</span>
          <div
            className="flex items-center justify-center bg-secondary rounded-full w-8 h-8 cursor-pointer"
            onClick={() => handleUrlCopy(short_url)}
          >
            {isCopied ? (
              <TiTick size={15} className="text-teal-500" />
            ) : (
              <AiOutlineCopy size="15" />
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 max-w-lg">
        <Link
          href={original_url}
          target="_blank"
          className="flex items-center gap-2"
        >
          <img
            src={getFaviconUrl(original_url)}
            width={30}
            height={30}
            alt="favicon"
            className="rounded-lg object-contain"
          />
          <span className="truncate">{original_url}</span>
        </Link>
      </td>
      <td className="whitespace-nowrap text-sm rounded-lg">
        <Image
          src={qrcode}
          width={100}
          height={100}
          alt="favicon"
          className="m-auto"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
        {clicks}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {new Date(date).toDateString()}
      </td>
    </tr>
  );
};

export default HistoryCard;
