"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { signIn, signOut } from "@/auth/helpers";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/UserButton";

const AuthButton = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <UserButton />
      ) : (
        <Button
          onClick={async () => {
            await signIn();
          }}
        >
          SignIn
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
