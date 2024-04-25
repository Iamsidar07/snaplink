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
    {
      feature: "Customizable Links",
      description:
        "Personalize your shortened URLs with custom aliases, making them memorable and relevant to your audience.",
      icon: "🔗",
    },
    {
      feature: "Actionable Insights",
      description:
        "Gain valuable insights into link performance and audience engagement with comprehensive analytics and reporting tools.",
      icon: "🔥",
    },
  ];
  return (
    <div className="pt-16 md:pt-32 max-w-7xl mx-auto ">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 md:mt-28 ">
        {features.map(({ feature, description, icon }) => (
          <div
            key={icon}
            className="rounded-3xl p-px  hover:bg-gradient-to-br from-zinc-100 via-teal-100 to-slate-50 dark:from-zinc-900 dark:via-teal-900 dark:to-orange-900 sm:max-w-sm h-full relative overflow-hidden group "
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-0 left-0 w-64 h-64 rounded-full bg-primary dark:bg-teal-700 filter blur-[22rem] transition-opacity" />
            <div className="rounded-[calc(1.5rem)] p-4 sm:p-8 flex flex-col gap-2 w-full h-full bg-background">
              <span className="text-2xl sm:text-3xl md:text-5xl">{icon}</span>
              <h3 className="headline text-normal md:text-xl tracking-widest mt-4">
                {feature}
              </h3>
              <p className="font-sans text-normal">{description}</p>
            </div>
          </div>
        ))}
      </div>
      <Image
        src={"/down-arrow.svg"}
        width={42}
        height={44}
        alt="See down"
        className="h-24 sm:h-64 mx-auto dark:invert"
      />
    </div>
  );
};

export default WhyChooseUs;
