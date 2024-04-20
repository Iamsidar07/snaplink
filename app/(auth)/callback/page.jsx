"use client";

import MyLoader from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Callback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/callback");
      return res.data;
    },
    onSuccess: () => {
      router.push(origin ? origin : "/dashboard");
    },
    onError: (err) => {
      console.error(err);
      router.push("/");
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <div className="flex flex-col items-center">
      {isPending ? <MyLoader /> : null}
      <h3 className="gradient-text text-xl mt-3">
        You will be automatically redirected...
      </h3>
    </div>
  );
};
export default Callback;
