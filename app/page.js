import ShortUrlForm from "@/components/ShortUrlForm";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <div className="max-w-3xl w-full mx-auto ">
        <h1 className="max-w-3xl mx-auto headline text-center">
          Simple and Fast URL <br /> 🔗Shortner
        </h1>
        <ShortUrlForm />
      </div>
      <WhyChooseUs />
    </main>
  );
}
