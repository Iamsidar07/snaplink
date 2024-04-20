import { ImageDown } from "lucide-react";
import React from "react";
import OgCard from "./OgCard";

const OgPreview = ({ title, description, image, shortUrl }) => {
  const socialSite = ["twitter", "facebook", "linkedin", "discord"];
  return (
    <div className="bg-white shadow p-2 md:px-6 md:pb-6 md:pt-4 rounded-xl border">
      <h2 className="!text-sm !md:text-xl font-semibold">
        Preview
        <ImageDown className="w-4 h-4 inline ml-2 text-orange-500" />
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6  ">
        {socialSite.map((site) => (
          <OgCard
            key={site}
            title={title}
            description={description}
            image={image}
            shortUrl={shortUrl}
            socialSite={site}
          />
        ))}
      </div>
    </div>
  );
};

export default OgPreview;
