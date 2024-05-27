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

export const getUserFromDb = async (email) => {
  try {
    await dbConnect()
    const user = await UserModel.findOne({ email })
    return user
  } catch (error) {
    console.log("Something went wrong.", error)
  }
}

export const registerUser = async (name, email, password) => {
  try {
    // get random superhero name
    const superheroName = getSuperHero();
    // create new user
    // hash password
    const salt = await bcryptjs.genSalt(8);
    const hashPassword = await bcryptjs.hash(password, salt);
    const getName = name ? name : superheroName;
    const newUser = await UserModel.create({
      email,
      password: hashPassword,
      name: getName,
      image: `https://api.multiavatar.com/${getName}.svg`,
    });
    return newUser

  } catch (error) {
    console.log('Failed to register user.')
  }
}