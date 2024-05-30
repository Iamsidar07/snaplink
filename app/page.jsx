import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import ShortUrlForm from "@/components/ShortUrlForm";
import ProductHunt from "@/components/ProductHunt";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UrlCount from "@/components/UrlCount";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <div className="w-52 h-52 absolute left-1/2 top-1/2 filter blur-[12rem] bg-gradient-to-r from-teal-900 to-transparent" />
      <div className="w-52 h-52 absolute left-1/4 top-[12rem] filter blur-[12rem] bg-gradient-to-r from-yellow-900 to-transparent" />
      <main className="overflow-x-hidden pb-12 md:pb-24">
        <ProductHunt />
        <MaxWidthWrapper className="w-full mx-auto flex flex-col items-center py-12 md:py-24">
          <div className="w-full border-x border-dashed">
            <div className="border-x border-dashed p-8 w-fit mx-auto">
              <div className="p-px mx-auto w-fit rounded-3xl bg-gradient-to-r from-orange-700  to-blue-900 ">
                <div className="bg-background rounded-[calc(2.5rem-1px)] px-3 py-1.5 text-sm">
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
        <MaxWidthWrapper className="bg-gradient-to-b from-zinc-900  to-zinc-950 p-2 mt-12 border rounded-2xl">
          <Image
            src={`/dashboard.png`}
            alt="hero"
            height={1080}
            width={1920}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </MaxWidthWrapper>
        <WhyChooseUs />
        <UrlCount />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
