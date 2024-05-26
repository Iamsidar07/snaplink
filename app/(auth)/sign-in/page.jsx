"use client";
import BackButton from "@/components/BackButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithNextAuth } from "@/actions";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center relative w-full">
      <BackButton />
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your information to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signInWithNextAuth} className="grid gap-4">
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <Button
            onClick={async () => signIn("google")}
            variant="outline"
            className="w-full mt-2"
          >
            Login up with Google
          </Button>
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
