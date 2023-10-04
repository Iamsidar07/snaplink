"use client";
import { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
interface CopyUrlComponentProps {
  shortUrl: string;
}
const CopyUrlComponent = ({ shortUrl }: CopyUrlComponentProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleUrlCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 700);
  };
  return (
    <div
      className="flex items-center justify-center bg-secondary rounded-full w-8 h-8 cursor-pointer"
      onClick={() => handleUrlCopy(shortUrl)}
    >
      {isCopied ? (
        <TiTick size={15} className="text-teal-500" />
      ) : (
        <AiOutlineCopy size="15" />
      )}
    </div>
  );
};

export default CopyUrlComponent;
