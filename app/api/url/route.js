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

export const DELETE = async (request) => {
  const requestBody = await request.json();
  const { url } = requestBody;
  if (!url) {
    return Response.json("Id's required.", { status: 400 });
  }
  const { userId } = auth();
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  try {
    await dbConnect();
    await UrlModel.deleteOne({ shortUrl: url, userId });
    return Response.json(true, { status: 200 });
  } catch (err) {
    return Response.json(err.message, { status: 500 });
  }
};
