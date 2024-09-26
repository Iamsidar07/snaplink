"use client";
import React from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithGithub from "./LoginWithGithub";

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <LoginWithGoogle />
      <LoginWithGithub />
    </div>
  );
};

export default SocialLogin;
