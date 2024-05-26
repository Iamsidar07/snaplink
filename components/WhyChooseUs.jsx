import { FEATURES } from "@/constants";
import { cn } from "@/lib/utils";

const WhyChooseUsCard = ({ feature: featureItem, index }) => {
  return (
    <div
      className={cn(
        "h-full relative overflow-hidden group border border-dashed",
        {
          "md:border-x-0": index === 1,
          "md:border-t-0": index === 3,
          "md:border-l-0": index === 4,
        },
      )}
    >
      <div className="rounded-[calc(1.5rem)] p-4 sm:p-8 flex flex-col gap-2 w-full h-full shadow">
        <div className="w-14 h-14 grid place-content-center rounded-full text-orange-500 bg-zinc-900">
          {featureItem.icon}
        </div>
        <h3 className="headline text-normal md:text-xl tracking-widest mt-4">
          {featureItem.feature}
        </h3>
        <p className="font-sans text-normal">{featureItem.description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <div className="w-full h-full relative border-b border-[#333]">
      <div className="absolute inset-x-0 h-1/2 bg-gradient-to-t from-[#111111] to-transparent bottom-0 -z-[1]" />
      <div className="pt-16 md:pt-32 max-w-7xl mx-auto">
        <h2 className="capitalize text-left relative inline-block font-bold">
          Why choose snaplink?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 md:mt-28">
          {FEATURES.map((featureItem, i) => (
            <WhyChooseUsCard key={i} feature={featureItem} index={i} />
          ))}
        </div>
        <div className="h-12 md:h-44 w-px border-r border-dashed mx-auto" />
      </div>
    </div>
  );
};

export default WhyChooseUs;
