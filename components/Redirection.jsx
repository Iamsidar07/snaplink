"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirection = ({ id }) => {
  const { toast } = useToast();
  const router = useRouter();
  const fetchUrl = async () => {
    const res = await axios.post(`/api/actualUrl`, { id });
    return res.data;
  };
  const { mutate, isPending } = useMutation({
    mutationKey: [id],
    mutationFn: fetchUrl,
    onSuccess: (data) => {
      if (data?.actualUrl) {
        router.replace(data.actualUrl);
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
      router.push("/");
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <main className="flex min-h-screen flex-col items-center pt-32">
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
  );
};

export default Redirection;
