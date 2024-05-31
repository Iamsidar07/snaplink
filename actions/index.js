"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import config from "@/config";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import axios from "axios";

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

export const login = async ({ email, password, name }) => {
  await signIn("credentials", {
    email,
    password,
    name,
    redirectTo: "/dashboard",
  });
};

export const signInWithGoogle = async () => {
  await signIn("google");
};

export const signInWithGithub = async () => {
  await signIn("github");
};
