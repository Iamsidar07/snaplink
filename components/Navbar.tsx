"use client"
import Link from "next/link"
import Button from "./Button"
import { CiLogin } from "react-icons/ci"
import { UserButton } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"
const Navbar = () => {
    const { userId } = useAuth()
    return (
        <header className="px-4 py-5 max-w-[1440px] mx-auto">
            <nav className="flex items-center justify-between">
                <Link href={"/"}>
                    <p className="text-2xl sm:text-3xl lg:text-5xl gradient-text font-bold">SnapLink</p>
                </Link>
                {
                    userId ? (
                        <UserButton />
                    ) : (
                        <ul className="flex items-center gap-5">

                            <li>
                                <Link href={"/login"}>
                                    <Button text="Login" variant="secondary" icon={<CiLogin size={25} className="" />} />
                                </Link>
                            </li>
                            <li>
                                <Link href={"/register-now"}>
                                    <Button text="Register Now" variant="primary" />
                                </Link>
                            </li>

                            <li>
                                <UserButton />
                            </li>
                        </ul>
                    )
                }

            </nav>

        </header>
    )
}

export default Navbar