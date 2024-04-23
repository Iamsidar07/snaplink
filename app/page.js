import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import config from "@/config/config";
import ShortUrlForm from "@/components/ShortUrlForm";

const getShortenUrlCount = async () => {
  const res = await fetch(`${config.domain}/api/urlCount`);
  return await res.json();
};

const UrlCount = ({ count }) => {
  return (
    <div className={"relative"}>
      <h4
        className={
          "headline text-center !leading-normal  md:text-6xl md:leading-tight"
        }
      >
        Over{" "}
        <span
          className={
            "inline-block text-[#ECA23E] px-1 mx-1.5 sm:px-4 relative font-recursive"
          }
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
    <main className="py-12 md:py-24 md:pb-[25%]">
      <div className="max-w-3xl w-full mx-auto">
        <div className="p-px mx-auto w-fit rounded-3xl bg-gradient-to-br from-orange-500 via-indigo-100 to-blue-500">
          <div className="bg-background rounded-[calc(2.5rem-1px)] px-3 py-1.5 text-sm tracking-wide">
            Snaplink is public now
          </div>
        </div>
        <h1 className="max-w-3xl mx-auto headline text-center text-4xl">
          Simple and Fast URL <br /> 🔗Shortner
        </h1>
        <ShortUrlForm />
      </div>

      <div className="dark:hidden sm:hidden bg-gradient-to-tr from-teal-100 via-indigo-200 to-orange-100 p-2 mt-12 border rounded-2xl">
        <Image
          src={`/dashboard-light.png`}
          alt="hero"
          height={1080}
          width={1920}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </div>
      <div className="light:hidden sm:hidden bg-gradient-to-tr from-teal-100 via-indigo-200 to-orange-100 p-2 mt-12 border rounded-2xl">
        <Image
          src={`/dashboard-dark.png`}
          alt="hero"
          height={1080}
          width={1920}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </div>

      <div className="hidden sm:dark:flex flex-col ">
        <ContainerScroll>
          <Image
            src={`/dashboard-dark.png`}
            alt="hero"
            height={1080}
            width={1920}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="hidden sm:dark:hidden sm:flex flex-col overflow-hidden ">
        <ContainerScroll>
          <Image
            src={`/dashboard-light.png`}
            alt="hero"
            height={1080}
            width={1920}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      <WhyChooseUs />
      <UrlCount count={shortenUrlCount ?? 0} />
    </main>
  );
}
