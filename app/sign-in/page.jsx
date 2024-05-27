import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";

export default async function SignInPage() {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center relative w-full">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your information to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" />
            </div>
            <button
              type="submit"
              className={buttonVariants({
                className: "w-full",
              })}
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}
