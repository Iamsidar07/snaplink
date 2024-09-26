"use client";
import { GithubIcon } from "@/lib/svg";
import { Button } from "../ui/button";
import { signInWithGithub } from "@/actions";
const LoginWithGithub = () => {
  return (
    <form action={signInWithGithub}>
      <Button
        type="submit"
        variant="outline"
        className="w-full flex items-center gap-1"
      >
        <GithubIcon />
        Continue with Github
      </Button>
    </form>
  );
};

export default LoginWithGithub;
