"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className={buttonVariants({
        variant: "secondary",
        className: "absolute left-4 top-12 border",
      })}
    >
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
