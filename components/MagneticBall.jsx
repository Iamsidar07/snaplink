"use client";
import React from "react";

import FramerMagnetic from "@/components/Framer";

const MagneticBall = () => {
  return (
    <FramerMagnetic>
      <div className="path w-72 h-72 blur-2xl brightness-110 !backdrop-filter backdrop-blur-lg -z-10 bg-gradient-to-b from-zinc-100 via-teal-100 to-slate-50 dark:from-zinc-950 dark:via-teal-900 dark:to-slate-900" />
    </FramerMagnetic>
  );
};

export default MagneticBall;
