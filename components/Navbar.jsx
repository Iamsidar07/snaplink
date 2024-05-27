import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";
import AuthButton from "@/app/AuthButton.client";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav
      className={cn(
        "w-full backdrop-blur sticky top-0 z-50 px-4 py-4 bg-background/90",
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
          {session?.user && (
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/dashboard"
            >
              dashboard
            </Link>
          )}
          <AuthButton />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
