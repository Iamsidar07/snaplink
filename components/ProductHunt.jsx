import React from "react";
import Link from "next/link";
import config from "@/config";

const ProductHunt = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6  px-3 py-1.5 max-w-fit mx-auto mt-6 absolute overflow-hidden rounded-lg group top-[40px] left-1/2 -translate-x-1/2">
      <Link
        href="https://www.producthunt.com/posts/snaplink-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-snaplink&#0045;2"
        target="_blank"
      >
        <img
          src={config.productHuntBadge}
          alt="Snaplink - Simple&#0032;and&#0032;Fast&#0032;URL&#0032;🔗Shortner | Product Hunt"
          width="250"
          height="54"
        />
      </Link>
    </div>
  );
};

export default ProductHunt;
