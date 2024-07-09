"use client";
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
import { createAccount, login } from "@/actions";
import SocialLogin from "@/components/auth/SocialLogin";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    const formData = new FormData(event.currentTarget);
    try {
      setIsLoading(true);
      await createAccount(formData);
      toast({
        title: "Account has been created",
      });
      toast({
        title: "Signing you in...",
      });
      await login({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      toast({
        title: "You will be redirect soon...",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: error.message || "Something went wrong!",
        description: "Something went wrong! Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center relative w-full">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
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
            <button
              disabled={isLoading}
              type="submit"
              className={buttonVariants({
                className: "w-full",
              })}
            >
              {isLoading && <Loader className="animate-spin mr-2 w-5 h-5" />}
              Create Account
            </button>
          </form>
          <SocialLogin />
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
