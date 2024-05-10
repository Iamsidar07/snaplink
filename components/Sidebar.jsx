"use client";
import { cn } from "@/lib/utils";
import { Home, LineChartIcon, Link2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
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
    <div className="p-4 space-y-2 sticky top-[53px] w-full ">
      {items?.map((item) => (
        <Link
          href={`/dashboard${item.url}`}
          key={item.name}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-900 cursor-pointer rounded transition-colors",
            {
              "bg-gray-100 text-gray-900":
                pathname.split("dashboard")[1] === item.url,
            },
          )}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
