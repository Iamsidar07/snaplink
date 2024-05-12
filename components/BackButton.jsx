"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="absolute left-4 top-12">
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
