import dbConnect from "@/db";
import ShortUrl from "@/models/ShortUrl";
import generateUniqueId from "generate-unique-id";
import { validateURL } from "@/lib/utils";
import { auth } from "@/auth";
import mongoose from "mongoose";

dbConnect();

// create shortUrl
export const POST = auth(async (req) => {
  const reqBody = await req.json();
  const { originalUrl, shortUrlId } = reqBody;
  const session = req.auth;
  const userId = session?.user?.id;
  const isValidUrl = validateURL(originalUrl);
  if (!isValidUrl) {
    return Response.json("Invalid URL", { status: 400 });
  }
  // connect to db
  try {
    const uniqueId = shortUrlId
      ? shortUrlId
      : generateUniqueId({
          length: 8,
          useLetters: true,
        });
    const newUrlData = {
      originalUrl,
      shortUrl: uniqueId,
    };
    if (userId) {
      newUrlData["userId"] = userId;
    }
    const newUrl = await ShortUrl.create(newUrlData);
    console.log("POST api/shortUrls-> Done");
    return Response.json(newUrl.shortUrl, { status: 201 });
  } catch (error) {
    console.log("POST api/shortUrls-> Error: ", error);
    return Response.json(error.message, { status: 500 });
  }
});
// get all short url
export const GET = auth(async (req) => {
  const session = req.auth;
  const userId = session?.user?.id;
  if (!userId) return Response.json("Unauthorized", { status: 403 });
  try {
    const urls = await ShortUrl.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
    console.log("GET api/shortUrls-> Done");
    return Response.json(urls, { status: 200 });
  } catch (error) {
    console.log("GET api/shortUrls-> Error: ", error);
    return Response.json(error.message, { status: 500 });
  }
});
