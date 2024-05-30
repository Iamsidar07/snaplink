import { SessionProvider } from "next-auth/react";
import AuthButtonClient from "./AuthButton.client";
import React from "react";
import { auth } from "@/auth";

const AuthButton = async () => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
};

export default AuthButton;
