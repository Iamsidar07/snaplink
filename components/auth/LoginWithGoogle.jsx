"use client";
import { GoogleIcon } from "@/lib/svg";
import { Button } from "../ui/button";
import { signInWithGoogle } from "@/actions";
const LoginWithGoogle = () => {
  return (
    <form action={signInWithGoogle}>
      <Button
        type="submit"
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </form>
  );
};

export default LoginWithGoogle;
