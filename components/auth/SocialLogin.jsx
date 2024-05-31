"use client";
import React from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithGithub from "./LoginWithGithub";

const SocialLogin = () => {
  return (
    <div className="flex items-center gap-3 grid grid-cols-1 md:grid-cols-2">
      <LoginWithGoogle />
      <LoginWithGithub />
    </div>
  );
};

export default SocialLogin;
