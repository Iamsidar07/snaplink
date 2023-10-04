import Link from "next/link";
import Button from "./Button";
import { CiLogin } from "react-icons/ci";
import { UserButton } from "@clerk/nextjs";
import Form from "./Form";
import { auth } from "@clerk/nextjs/server";
const Navbar = () => {
  const { userId } = auth();
  return (
    <header className="px-4 py-5 max-w-[1440px] mx-auto">
      <nav className="flex items-center gap-2 sm:gap-6 justify-between">
        <Link href={"/"}>
          <p className="text-2xl sm:text-3xl lg:text-5xl gradient-text font-bold">
            SnapLink
          </p>
        </Link>
        {userId && (
          <div className="flex-1 hidden md:flex">
            <Form />
          </div>
        )}
        {userId ? (
          <div className="bg-secondary ring-1 ring-secondary px-6 py-3 rounded-full">
            <UserButton showName={true} />
          </div>
        ) : (
          <ul className="flex items-center sm:gap-5">
            <li>
              <Link href={"/login"}>
                <Button
                  text="Login"
                  variant="secondary"
                  icon={<CiLogin size={25} className="" />}
                />
              </Link>
            </li>
            <li>
              <Link href={"/register-now"} className="hidden sm:flex">
                <Button text="Register Now" variant="primary" />
              </Link>
            </li>

            <li>
              <UserButton />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
