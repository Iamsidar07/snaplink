"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import MaxWidthWrapper from "./MaxWidthWrapper";

const testimonials = [
  {
    name: "Abdulmumin Yaqeen",
    quote: "The UI is sleek 👌. Well made ♥!",
    title: "",
  },
  {
    quote: "Congratulations on the launch of Snaplink",
    name: "Avkash Kakdiya",
    title: "",
  },
  {
    quote:
      "Hey Manoj! Loved your launch on PH Today 🔥 what a great idea. I gave you a vote and a comment on the product ❤️",
    name: "Mohsen Khani",
    title: "",
  },
];
const Testimonials = () => {
  return (
    <MaxWidthWrapper className="py-16 md:py-32">
      <h2 className="capitalize text-left relative inline-block md:text-3xl font-bold">
        What other peoples are saying?
      </h2>
      <div className="mt-8 md:mt-12 rounded-md max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="fast"
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Testimonials;
