import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  return (
    <nav className="w-full backdrop-blur border-b fixed top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link className="flex items-center gap-2" href="/">
          <Image
            src={"/logo.png"}
            width={40}
            height={40}
            alt="Snaplink logo"
            className="object-cover border rounded-xl pointer-events-none"
          />
          <span className="headline text-lg md:text-3xl">Snaplink</span>
        </Link>
        <div className="flex items-center gap-2">
          <SignedOut>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/sign-in"
            >
              signin
            </Link>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/sign-up"
            >
              signup
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/dashboard"
            >
              dashboard
            </Link>

            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
