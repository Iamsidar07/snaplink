import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register Now | Snaplink",
  description: "Register to Snaplink.",
};
const RegistetrPage = () => {
  return (
    <main className="grid place-items-center min-h-[calc(100vh_-_91px)]">
      <SignUp />
    </main>
  );
};

export default RegistetrPage;
