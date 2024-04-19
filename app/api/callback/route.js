import dbConnect from "@/db";
import UserModel from "@/db/models/User";
import { currentUser } from "@clerk/nextjs";

export const POST = async (request) => {
  const user = await currentUser();
  if (!user?.id) {
    return Response.json("Unauthorized", { status: 401 });
  }
  try {
    await dbConnect();
    const email = user.emailAddresses[0].emailAddress;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json(existingUser, { status: 200 });
    }
    const newUser = await UserModel.create({
      userId: user.id,
      email,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
};
