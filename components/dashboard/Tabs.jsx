"use client";
import { Home, LineChartIcon, Link2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";

const Tabs = () => {
  const pathname = usePathname();
  const items = [
    {
      name: "Home",
      icon: <Home className="w-4 h-4" />,
      url: "",
    },
    {
      name: "Links",
      icon: <Link2 className="w-4 h-4" />,
      url: "/links",
    },
    {
      name: "Analytics",
      icon: <LineChartIcon className="w-4 h-4" />,
      url: "/analytics",
    },
  ];
  return (
    <div className="border-b">
      <MaxWidthWrapper className="px-2 py-1.5 sticky top-0 left-0 right-0 w-full flex items-center gap-1 md:gap-3">
        {items?.map((item) => {
          const isActive = pathname.split("dashboard")[1] === item.url;

          return (
            <Link
              href={`/dashboard${item.url}`}
              key={item.name}
              className={buttonVariants({
                variant: isActive ? "default" : "ghost",
                size: "sm",
                className:
                  "flex items-center gap-1.5 px-3 py-1 cursor-pointer rounded-2xl text-sm",
              })}
            >
              <div className="hidden md:block">{item.icon}</div>
              <span className="">{item.name}</span>
            </Link>
          );
        })}
      </MaxWidthWrapper>
    </div>
  );
};

export default Tabs;
