import ShortUrlForm from "@/components/ShortUrlForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import UrlCount from "@/components/UrlCount";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default async function Home() {
  return (
    <main className="py-12 md:py-24">
      <div className="max-w-3xl w-full mx-auto">
        <p className="headline !text-sm md:!text-sm border shadow-lg px-4 py-2.5 mx-auto w-fit rounded-full">
          Snaplink is public now
        </p>
        <h1 className="max-w-3xl mx-auto headline text-center text-4xl">
          Simple and Fast URL <br /> 🔗Shortner
        </h1>
        <ShortUrlForm />
      </div>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll>
          <Image
            src={`/dashboard.png`}
            alt="hero"
            height={1080}
            width={1920}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      {/* <div className="p-4 sm:p-6 border max-w-7xl mx-auto mt-12 sm:mt-24 rounded-3xl bg-gradient-to-br from-zinc-100 via-orange-50 to-slate-50 overflow-hidden shadow">
        <Image
          src={"/dashboard.png"}
          alt="dashboard preview"
          width={1920}
          height={1080}
          className="rounded-3xl"
        />
      </div> */}
      <WhyChooseUs />
      <UrlCount />
    </main>
  );
}
