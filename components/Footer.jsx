import config from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LucideTwitter } from "lucide-react";

const Footer = () => {
  const url = new URL(process.env.DOMAIN);
  const domain = url.host;
  return (
    <footer className="relative bg-background">
      <div className="flex items-center justify-center gap-2 absolute bottom-6 -z-10 w-full">
        <Image
          src={"/logo.png"}
          width={1024}
          height={1024}
          alt="Snaplink logo"
          className="w-16 sm:w-44 object-cover border rounded-3xl pointer-events-none"
        />
        <span className="headline text-6xl  md:text-[10rem]">Snaplink</span>
      </div>

      <div className="w-full border-t mt-3 sm:mt-0 p-4 sm:p-8 flex flex-col items-center">
        <p className="text-center text-xs sm:text-sm">
          &copy;{new Date().getFullYear()} Copyright {domain}- Tool to shorten a
          long link
        </p>
        <p className="mt-1.5 flex items-center gap-2 ">
          <span>follow me at</span>
          <Link
            href=""
            className="text-secondary-foreground flex items-center gap-1.5"
          >
            <LucideTwitter className="w-4 h-4 text-secondary-foreground" />
            @iamsidar07
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
