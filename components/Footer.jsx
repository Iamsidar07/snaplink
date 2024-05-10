import config from "@/config/config";
import Link from "next/link";
import React from "react";
import { LucideTwitter } from "lucide-react";

const Footer = () => {
  const url = new URL(config.domain);
  const domain = url.host;
  return (
    <footer className="relative bg-background">
      <div className="w-full border-t mt-3 sm:mt-0 p-4 flex flex-col items-center">
        <p className="text-center text-xs sm:text-sm">
          &copy;{new Date().getFullYear()} Copyright {domain}- Tool to shorten a
          long link
        </p>
        <p className="mt-1.5 flex items-center gap-2 ">
          <span>follow me at</span>
          <Link
            href=""
            className="text-secondary-foreground flex items-center gap-1"
          >
            <LucideTwitter className="w-3 h-3 text-secondary-foreground" />
            @iamsidar07
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
