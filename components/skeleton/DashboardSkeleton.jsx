import React from "react";
import ShortUrlForm from "../ShortUrlForm";

const DashboardSkeleton = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto pt-32">
      <div className="max-w-4xl mx-auto mb-12">
        <ShortUrlForm />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {new Array(12).fill(0).map((_, i) => (
          <div
            key={i}
            className="max-w-xs h-44 w-full bg-gray-100 border rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
