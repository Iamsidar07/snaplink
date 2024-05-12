"use client";
import { cn } from "@/lib/utils";
import { Home, LineChartIcon, Link2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

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
    <div className=" bg-white border-b">
      <MaxWidthWrapper className="px-2 py-1.5 sticky top-0 left-0 right-0 w-full flex items-center gap-1 md:gap-3">
        {items?.map((item) => (
          <Link
            href={`/dashboard${item.url}`}
            key={item.name}
            className={cn(
              "flex items-center gap-3 px-3 py-1 md:py-2 text-gray-500 hover:text-gray-900 cursor-pointer rounded-2xl md:rounded transition-colors",
              {
                "bg-gray-100 text-gray-900":
                  pathname.split("dashboard")[1] === item.url,
              },
            )}
          >
            <div className="hidden md:block">{item.icon}</div>
            <span className="">{item.name}</span>
          </Link>
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default Tabs;
