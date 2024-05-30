import React from "react";
import Link from "next/link";
import UserButton from "./UserButton";
import { buttonVariants } from "./ui/button";

const AuthButton = ({ session }) => {
  return (
    <div>
      {session?.user ? (
        <UserButton session={session} />
      ) : (
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href="/sign-in"
        >
          SignIn
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
