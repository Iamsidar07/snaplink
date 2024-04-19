import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";
import { validateURL } from "@/utils";
import { auth } from "@clerk/nextjs";
import generateUniqueId from "generate-unique-id";

export const POST = async (req) => {
  const reqBody = await req.json();
  const { url } = reqBody;
  const { userId } = auth();
  const isValidUrl = validateURL(url);
  if (!isValidUrl) {
    return Response.json("Invalid URL", { status: 400 });
  }
  // connect to db
  try {
    await dbConnect();
    const uniqueId = generateUniqueId({
      length: 8,
      useLetters: true,
    });
    const newUrl = await UrlModel.findOneAndUpdate(
      { actualUrl: url },
      {
        shortUrl: `${process.env.DOMAIN}/s/${uniqueId}`,
        userId: userId ?? null,
      },
      { upsert: true, new: true },
    );
    return Response.json(newUrl, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(error.message, { status: 500 });
  }
};
