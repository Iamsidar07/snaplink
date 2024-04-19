import ShortUrlForm from "@/components/ShortUrlForm";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <div className="max-w-3xl w-full mx-auto ">
        <h1 className="max-w-3xl mx-auto headline text-center">
          Simple and Fast URL <br /> 🔗Shortner
        </h1>
        <div className="mt-6 bg-white w-full p-6 border rounded text-center">
          <ShortUrlForm />
          <p className="mt-6 text-muted-foreground">
            ShortURL is a free tool to shorten URLs and generate short links URL
            shortener allows to create a shortened link making it easy to share
          </p>
        </div>
      </div>

      <WhyChooseUs />
    </main>
  );
}
