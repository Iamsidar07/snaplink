"use client";
import { GithubIcon } from "@/lib/svg";
import { Button } from "../ui/button";
import { signInWithGithub } from "@/actions";
const LoginWithGithub = () => {
  return (
    <form action={signInWithGithub}>
      <Button type="submit" variant="outline" className="w-full mt-2">
        <GithubIcon />
      </Button>
    </form>
  );
};

export default LoginWithGithub;
