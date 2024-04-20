import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";
import { auth } from "@clerk/nextjs";

// get all url of a user
export const GET = async (request) => {
  const { userId } = auth();
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  try {
    await dbConnect();
    const urls = await UrlModel.find({ userId });
    return Response.json(urls, { status: 200 });
  } catch (err) {
    return Response.json(err.message, { status: 500 });
  }
};
