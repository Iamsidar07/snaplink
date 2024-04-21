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
      <WhyChooseUs />
      <UrlCount />
    </main>
  );
}
