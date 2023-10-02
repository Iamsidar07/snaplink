import { SignIn } from "@clerk/nextjs"

const LoginPage = () => {
    return (
        <main className="grid place-items-center min-h-[calc(100vh_-_91px)]">
            <SignIn />
        </main>
    )
}

export default LoginPage