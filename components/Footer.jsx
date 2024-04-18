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
          className="w-16 sm:w-44 object-cover border rounded-3xl"
        />
        <span className="headline md:text-[10rem]">Snaplink</span>
      </div>

      <div className="w-full border-t mt-3 sm:mt-0 p-8 sm:p-16 bg-white">
        <p className="text-center">
          &copy;{new Date().getFullYear()} Copyright {process.env.DOMAIN}- Tool
          to shorten a long link
        </p>
      </div>
    </footer>
  );
};

export default Footer;
