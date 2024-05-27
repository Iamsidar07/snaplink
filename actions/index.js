"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import config from "@/config";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import axios from "axios";
import dbConnect from "@/db";
import UserModel from "@/models/User";
import { getSuperHero } from "@/lib/utils";
import bcryptjs from "bcryptjs"

export default async function revalidate({ tag, path }) {
  if (tag) {
    revalidateTag(tag);
  }
  if (path) {
    revalidatePath(path);
  }
}

export const getTotalClicks = async () => {
  const res = await axios.get("/api/clicks/totalClicks");
  return res.data;
};

export const getClicksOverTime = async () => {
  const res = await fetch(config.domain + "/api/clicks/overTime");
  const data = await res.json();
  return data;
};



export const signInWithGoogle = async () => {
  try {
    await signIn("google");
  } catch (error) {
    console.log("Error", error);
    throw Error(error);
  }
};

export const createAccount = async (formData) => {
  try {
    const res = await fetch(config.domain + "/api/createAccount", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    redirect("/sign-in");
  } catch (error) {
    console.log("Error", error);
  }
};

export const logOut = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw Error(error);
    }
  } finally {
    redirect("/");
  }
};