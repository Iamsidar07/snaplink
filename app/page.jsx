import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import config from "@/config";
import ShortUrlForm from "@/components/ShortUrlForm";
import ProductHunt from "@/components/ProductHunt";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { auth } from "@/auth";

const getShortenUrlCount = async () => {
  try {
    const res = await fetch(`${config.domain}/api/countLinks`, {
      cache: "no-cache",
    });
    if (res.status === 500) {
      return 0;
    }

    return await res.json();
  } catch (error) {
    console.log(error?.message);
    return 0;
  }
};

const UrlCount = ({ count }) => {
  return (
    <div className={"relative py-12 md:py-24"}>
      <h4
        className={
          "headline text-center text-3xl !leading-normal  md:text-6xl md:leading-tight capitalize"
        }
      >
        Over{" "}
        <span
          className={
            "inline-block text-[#ECA23E] px-1 mx-1.5 sm:px-4 relative font-bold border-b border-dashed"
          }
        >
          {count?.toLocaleString() ?? 0}
        </span>{" "}
        URL&apos;s Shortened <br /> and Counting!
      </h4>
    </div>
  );
};

export default async function Home() {
  const shortenUrlCount = await getShortenUrlCount();
  return (
    <div>
      <main className="overflow-x-hidden pb-12 md:pb-24">
        <MaxWidthWrapper className="w-full mx-auto flex flex-col items-center py-12 md:py-24">
          <div className="w-full border-x border-dashed">
            <div className="border-x border-dashed p-8 w-fit mx-auto">
              <div className="p-px mx-auto w-fit rounded-3xl bg-gradient-to-r from-orange-700  to-blue-900 ">
                <div className="bg-background rounded-[calc(2.5rem-1px)] px-3 py-1.5 text-sm tracking-wide">
                  Snaplink is public now
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-center  border-y border-dashed w-full">
            Shorten. Share. Simplify.
          </h1>
          <div className={"border border-t-0 border-dashed w-full p-8"}>
            <ShortUrlForm className={"max-w-xl mx-auto"} />
          </div>
          <div className="border border-t-0 border-dashed w-full p-6">
            <p className="text-muted-foreground text-center max-w-xl mx-auto text-lg">
              Snaplink is a free tool to shorten URLs and generate short links
              URL shortener allows to create a shortened link making it easy to
              share
            </p>
          </div>
          <div className="h-24 w-full max-w-xl border-x border-dashed"></div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="bg-gradient-to-b from-zinc-800  to-zinc-900 p-2 mt-12 border rounded-2xl">
          <Image
            src={`/dashboard-light.png`}
            alt="hero"
            height={1080}
            width={1920}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </MaxWidthWrapper>
        <WhyChooseUs />
        <UrlCount count={shortenUrlCount ?? 0} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
