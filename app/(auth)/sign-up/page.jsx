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
import { createAccount } from "@/actions";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center relative w-full">
      <BackButton />
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAccount} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Max" />
            </div>
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
              Create an account
            </Button>
          </form>
          <Button
            onClick={async () => signIn("google")}
            variant="outline"
            className="w-full mt-2"
          >
            Sign up with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}
