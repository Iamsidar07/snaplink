import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import config from "@/config/config";
import ShortUrlForm from "@/components/ShortUrlForm";
import ProductHunt from "@/components/ProductHunt";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const getShortenUrlCount = async () => {
  const res = await fetch(`${config.domain}/api/urlCount`);
  return await res.json();
};

const UrlCount = ({ count }) => {
  return (
    <div className={"relative"}>
      <h4
        className={
          "headline text-center text-3xl !leading-normal  md:text-6xl md:leading-tight capitalize"
        }
      >
        Over{" "}
        <span
          className={"inline-block text-[#ECA23E] px-1 mx-1.5 sm:px-4 relative"}
        >
          {count?.toLocaleString() ?? 0}
          <Image
            src={"/underline.png"}
            alt="url count"
            width={797}
            height={78}
            className="absolute bottom-0 inset-x-0 w-full dark:invert"
          />
        </span>{" "}
        URL&apos;s Shortened <br /> and Counting!
      </h4>
    </div>
  );
};

export default async function Home() {
  const shortenUrlCount = await getShortenUrlCount();
  return (
    <MaxWidthWrapper>
      <ProductHunt />
      <main className="py-12 md:py-24 md:pb-[15%] overflow-x-hidden px-4">
        <div className="md:max-w-3xl w-full mx-auto space-y-4">
          <div className="p-px mx-auto w-fit rounded-3xl bg-gradient-to-r from-orange-700  to-blue-900">
            <div className="bg-background rounded-[calc(2.5rem-1px)] px-3 py-1.5 text-sm tracking-wide">
              Snaplink is public now
            </div>
          </div>
          <h1 className="text-center mt-2 text-4xl lg:text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 to-indigo-600">
              Link.
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-pink-500 to-pink-900">
              {" "}
              Snap.
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-teal-500 to-green-600">
              {" "}
              Success.
            </span>
          </h1>
          <ShortUrlForm />
        </div>

        <div className="bg-gradient-to-b from-gray-50  to-gray-100 p-2 mt-12 border rounded-2xl">
          <Image
            src={`/dashboard-light.png`}
            alt="hero"
            height={1080}
            width={1920}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </div>
        <WhyChooseUs />
        <UrlCount count={shortenUrlCount ?? 0} />
        <Testimonials />
      </main>
      <Footer />
    </MaxWidthWrapper>
  );
}
