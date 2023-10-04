"use client";
import Button from "./Button";
import { useAuth } from "@clerk/nextjs";
import generateSearchParams from "@/utils/generateSearchParams";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedSelect from "./SelectOption";
import toast from "react-hot-toast";
interface Option {
  value: string;
  label: string;
}

const HistoryAction = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const clearHisotry = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/all?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.status === 201) {
        toast.success("History cleared successfully");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
      console.error("Something went wrong!", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const options: Option[] = [
    { value: "", label: "All" },
    { value: "clicks", label: "By Clicks" },
    { value: "date", label: "By Dates" },
  ];

  const handleOptionChange = (option: Option) => {
    let url = "";
    if (option.value === "") {
      url = generateSearchParams("sortby", "", ["sortby"]);
    } else {
      url = generateSearchParams("sortby", option.value);
    }
    router.push(url, { scroll: false });
  };
  return (
    <div className="flex items-center gap-2 relative">
      <Button
        text="Clear History"
        variant="secondary"
        onClick={clearHisotry}
        loading={isLoading}
      />
      <AnimatedSelect onChange={handleOptionChange} options={options} />
    </div>
  );
};

export default HistoryAction;
