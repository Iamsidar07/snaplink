"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [url, setUrl] = useState(null);
  const fetchUrl = async () => {
    const res = await axios.post(`/api/actualUrl`, { url });
    return res.data;
  };
  const { mutate, isPending } = useMutation({
    mutationKey: [url],
    mutationFn: fetchUrl,
    onSuccess: (data) => {
      if (data?.actualUrl) {
        router.replace(data.actualUrl);
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong!",
        description: "Please try again",
        variant: "destructive",
      });
      router.push("/");
    },
  });

  useEffect(() => {
    if (window) {
      setUrl(window.location.href);
    }
  }, [url]);
  console.log(url);

  useEffect(() => {
    if (url) {
      mutate();
    }
  }, [mutate, url]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center  p-24">
        <div className="z-10 max-w-3xl w-full mx-auto ">
          <h1 className="max-w-3xl mx-auto headline">
            Redirecting towards your destination...
          </h1>
        </div>
        <Loader
          className={cn("w-8 h-8 mt-12", {
            "animate-spin": isPending,
          })}
        />
      </main>
    </>
  );
};

export default Page;
