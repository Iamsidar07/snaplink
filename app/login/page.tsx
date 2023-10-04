import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login | Snaplink",
  description: "Login/SignIn to Snaplink.",
};
const LoginPage = () => {
  return (
    <main className="grid place-items-center min-h-[calc(100vh_-_91px)]">
      <SignIn />
    </main>
  );
};

export default LoginPage;
