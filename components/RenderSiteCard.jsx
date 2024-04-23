import React from "react";
import OgCard from "./OgCard";
import { cn } from "@/lib/utils";

const socialSite = ["twitter", "linkedin", "facebook", "discord"];
const RenderSiteCard = ({ shortUrl, og }) => {
  return (
    <>
      {socialSite.map((site, i) => (
        <div
          key={site}
          className={cn("h-full", {
            "md:col-span-2 ": i == 0,
          })}
        >
          <OgCard
            title={og.title}
            description={og.description}
            image={og.image}
            shortUrl={shortUrl}
            socialSite={site}
          />
        </div>
      ))}
    </>
  );
};

export default RenderSiteCard;
