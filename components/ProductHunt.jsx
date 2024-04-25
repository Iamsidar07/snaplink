import React from "react";
import Link from "next/link";

const ProductHunt = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-recursive px-3 py-1.5 max-w-fit mx-auto mt-6 relative overflow-hidden rounded-lg border border-background group">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary dark:bg-teal-700 filter blur-[16rem] group-hover:brightness-200 transition-all" />

      <p>
        👏 Checkout features on
        <Link
          href="https://www.producthunt.com/posts/snaplink-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-snaplink&#0045;2"
          target="_blank"
          className="underline underline-offset-4 text-primary mx-1.5"
        >
          Product Hunt
        </Link>
        🎉
      </p>
      <Link
        href="https://www.producthunt.com/posts/snaplink-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-snaplink&#0045;2"
        target="_blank"
      >
        <img
          src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=453724&theme=dark`}
          alt="Snaplink - Simple&#0032;and&#0032;Fast&#0032;URL&#0032;🔗Shortner | Product Hunt"
          width="250"
          height="54"
        />
      </Link>
    </div>
  );
};

export default ProductHunt;
