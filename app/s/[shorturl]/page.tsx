"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

interface RedirectPageProps {
  params: {
    shorturl: string;
  };
}
const RedirectPage = ({ params }: RedirectPageProps) => {
  const { shorturl } = params;
  console.log(shorturl);
  const router = useRouter();
  useEffect(() => {
    const fetchShortUrl = async () => {
      console.log(`/api/shorturl/${shorturl}`)
      try {
        const response = await fetch(`/api/shorturl/${shorturl}`);
        const data = await response.json();
        router.push(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShortUrl();
  }, []);

  return (
    <main className="grid place-items-center min-h-[calc(100vh_-_91px)] ">
      <div className="flex flex-col items-center gap-2">
        <ImSpinner2 size={35} className="animate-spin" />
        <h1 className="text-3xl font-bold">Redirecting...</h1>
      </div>
    </main>
  );
};

export default RedirectPage;
