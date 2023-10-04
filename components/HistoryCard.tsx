import { History } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CopyUrlComponent from "./CopyUrlComponent";

const HistoryCard = ({
  _id,
  clicks,
  createdAt,
  original_url,
  short_url,
  qrcode,
}: History) => {
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
          <CopyUrlComponent shortUrl={short_url} />
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
        {new Date(createdAt).toDateString()}
      </td>
    </tr>
  );
};

export default HistoryCard;
