"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full backdrop-blur border-b dark:border-b-border bg-background  fixed top-0 z-50 px-4 sm:px-12 py-1.5">
      <div className="absolute -top-0 left-0 w-64 h-64 rounded-full bg-teal-700 filter blur-[15rem]" />
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link className="flex items-center gap-2" href="/">
          <Image
            src={"/logo.png"}
            width={30}
            height={30}
            alt="Snaplink logo"
            className="object-cover border rounded-xl pointer-events-none"
          />
          <span className="headline md:text-xl">Snaplink</span>
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

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard:
                    "border border-border bg-background text-secondary-foreground",
                  userPreviewSecondaryIdentifier__userButton:
                    "text-secondary-foreground",
                  userPreviewMainIdentifier__userButton:
                    "text-secondary-foreground",
                  userButtonPopoverActionButtonIcon:
                    "text-secondary-foreground",
                  userButtonPopoverActionButtonText:
                    "text-secondary-foreground",
                  userButtonPopoverActionButtonIcon__signOut:
                    "text-secondary-foreground",
                },
              }}
            />
          </SignedIn>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
