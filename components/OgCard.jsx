"use clilent";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OgCard = ({ title, image, description, socialSite, shortUrl }) => {
  const url = new URL(shortUrl);
  const domain = url.hostname;
  return (
    <div target="_blank" className={"w-full md:w-[45%]"}>
      <h3 className="mb-2 capitalize">{socialSite}</h3>
      <Link
        className={cn("block", {
          "rounded-xl relative": socialSite.toLowerCase() == "twitter",
          "flex flex-col-reverse relative":
            socialSite.toLowerCase() == "discord",
        })}
        href={shortUrl}
      >
        <Image
          src={image}
          width={1200}
          height={630}
          alt={`og-${socialSite}`}
          className={cn("mt-2 aspect-[1200/630] object-cover", {
            "rounded-xl ": socialSite.toLowerCase() == "twitter",
            "mt-0 rounded-b": socialSite.toLowerCase() == "discord",
          })}
        />
        <div
          className={cn("p-2 border border-t-0 bg-gray-100", {
            "p-0 border-none bg-none": socialSite.toLowerCase() == "twitter",
            "border-none bg-[#333333] rounded-t":
              socialSite.toLowerCase() == "discord",
          })}
        >
          {socialSite.toLowerCase() == "linkedin" ? (
            <h3
              className={cn("text-lg font-bold truncate", {
                "hidden ": socialSite.toLowerCase() == "twitter",
              })}
            >
              {title}
            </h3>
          ) : null}
          <small
            className={cn("text-gray-400 text-sm", {
              "bg-black rounded-full px-4 py-1.5 absolute bottom-2 ml-2":
                socialSite.toLowerCase() == "twitter",
              "uppercase text-xs": socialSite.toLowerCase() == "facebook",

              "text-gray-50 ": socialSite.toLowerCase() == "discord",
            })}
          >
            {domain}
          </small>
          <h3
            className={cn("text-lg font-bold truncate", {
              "hidden ":
                socialSite.toLowerCase() == "twitter" ||
                socialSite.toLowerCase() == "linkedin",

              "text-[#00B0F4]": socialSite.toLowerCase() == "discord",
            })}
          >
            {title}
          </h3>
          <h4
            className={cn("text-sm text-gray-600 truncate", {
              "hidden ":
                socialSite.toLowerCase() == "twitter" ||
                socialSite.toLowerCase() == "linkedin",

              "text-gray-100 ": socialSite.toLowerCase() == "discord",
            })}
          >
            {description}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default OgCard;
