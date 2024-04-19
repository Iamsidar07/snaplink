import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      feature: "Streamlined Simplicity",
      description: "Long URLs become elegant and concise with just a click.",
      icon: "🚀",
    },
    {
      feature: "Branded Links",
      description:
        "Tailor your shortened URLs to reflect your brand, adding professionalism to every share.",
      icon: "🎨",
    },

    {
      feature: "Reliable Security",
      description:
        "Rest easy knowing your links are secure and protected with advanced encryption.",
      icon: "🔒",
    },
  ];
  return (
    <div className="pt-16 md:pt-32 max-w-5xl mx-auto">
      <h2 className="headline capitalize text-left relative inline-block text-3xl">
        Why choose snaplink?
        <span>
          <Image
            src={"/arrow.png"}
            alt="arrow"
            width={1950}
            height={148}
            className="absolute inset-x-0 object-contain pointer-events-none"
          />
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-16 md:mt-28 md:mb-32">
        {features.map(({ feature, description, icon }) => (
          <div
            key={icon}
            className="border rounded-xl md:rounded-3xl p-4 sm:p-8 flex flex-col gap-2 bg-white bg-opacity-70 backdrop-blur w-full sm:max-w-sm"
          >
            <span className="text-2xl sm:text-3xl md:text-5xl">{icon}</span>
            <h3 className="headline text-normal md:text-2xl tracking-widest">
              {feature}
            </h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
