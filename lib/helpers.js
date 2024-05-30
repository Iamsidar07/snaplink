"use server";
import { signIn as naSignIn, signOut } from "@/auth";
export const signIn = async () => {
  await naSignIn();
};
export const logout = async () => {
  await signOut();
};
