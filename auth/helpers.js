"use server";
import {
  signIn as signInWithNextAuth,
  signOut as signOutWithNextAuth,
} from ".";

export const signIn = async () => {
  await signInWithNextAuth();
};
export const signOut = async () => {
  await signOutWithNextAuth();
};
