"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "w-full backdrop-blur sticky top-0 z-50 px-4 py-1.5 bg-background/90",
        {
          hidden: pathname === "/sign-in" || pathname === "/sign-up",
        },
      )}
    >
      <MaxWidthWrapper className="flex items-center justify-between w-full">
        <Link className="flex items-center gap-2" href="/">
          <Image
            src={"/logo.png"}
            width={30}
            height={30}
            alt="Snaplink logo"
            className="object-cover border rounded-xl pointer-events-none"
          />
          <span className="md:text-xl">Snaplink</span>
        </Link>
        <div className="flex items-center gap-2">
          <SignedOut>
            <Link
              className={buttonVariants({ variant: "link" })}
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

            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
