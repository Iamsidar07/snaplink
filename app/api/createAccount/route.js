import dbConnect from "@/db";
import { getSuperHero } from "@/lib/utils";
import UserModel from "@/models/User";
import bcryptjs from "bcryptjs";

export const POST = async (req) => {
  const formdata = req.formData();
  const name = formdata.get("name");
  const email = formdata.get("email");
  const password = formdata.get("password");
  if (!email || !password) {
    return Response.json("All fields are required.", { status: 400 });
  }
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email });
    if (user) {
      return Response.json("User exist with this email.", { status: 200 });
    }
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

    return Response.json(newUser, { status: 201 });
  } catch (e) {
    console.log("ERROR: ", e);
    return Response.json(e.message, { status: 500 });
  }
};
