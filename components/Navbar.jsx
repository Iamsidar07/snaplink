import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white backdrop-blur bg-opacity-50 border-b fixed top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link className="flex items-center gap-2" href="/">
          <Image
            src={"/logo.png"}
            width={40}
            height={40}
            alt="Snaplink logo"
            className="object-cover border rounded-xl"
          />
          <span className="headline text-lg md:text-3xl">Snaplink</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
