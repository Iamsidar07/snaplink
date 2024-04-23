import React from "react";
import ShortUrlForm from "../ShortUrlForm";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-32">
      <div className="max-w-4xl mx-auto mb-12">
        <ShortUrlForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {new Array(6).fill(0).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full h-36 max-w-sm rounded-2xl border border-border"
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
