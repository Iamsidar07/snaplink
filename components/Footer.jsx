import config from "@/config/config";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-center gap-2">
        <Image
          src={"/logo.png"}
          width={1024}
          height={1024}
          alt="Snaplink logo"
          className="w-16 sm:w-44 object-cover border rounded-3xl pointer-events-none"
        />
        <span className="headline text-6xl  md:text-[10rem]">Snaplink</span>
      </div>

      <div className="w-full border-t mt-3 sm:mt-0 p-4 sm:p-8 bg-white">
        <p className="text-center text-xs sm:text-sm">
          &copy;{new Date().getFullYear()} Copyright {config.domain}- Tool
          to shorten a long link
        </p>
      </div>
    </footer>
  );
};

export default Footer;
