import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

const MyLoader = ({ className }) => {
  return <Loader className={cn("w-6 h-6 animate-spin mx-auto", className)} />;
};

export default MyLoader;
