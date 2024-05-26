import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import AuthButtonClient from "./AuthButton.client";
import React from "react";

const AuthButton = async () => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
};

export default AuthButton;
