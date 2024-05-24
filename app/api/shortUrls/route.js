import dbConnect from "@/db";
import ShortUrl from "@/models/ShortUrl";
import { validateURL } from "@/utils";
import { auth } from "@clerk/nextjs";
import generateUniqueId from "generate-unique-id";

dbConnect();

// create shortUrl
export const POST = async (req) => {
  const reqBody = await req.json();
  const { originalUrl } = reqBody;
  const { userId } = auth();
  const isValidUrl = validateURL(originalUrl);
  if (!isValidUrl) {
    return Response.json("Invalid URL", { status: 400 });
  }
  // connect to db
  try {
    const uniqueId = generateUniqueId({
      length: 8,
      useLetters: true,
    });
    const newUrl = await ShortUrl.create({
      originalUrl,
      shortUrl: uniqueId,
      userId: userId ?? null,
    });
    console.log("POST api/shortUrls-> Done");
    return Response.json(newUrl.shortUrl, { status: 201 });
  } catch (error) {
    console.log("POST api/shortUrls-> Error: ", error);
    return Response.json(error.message, { status: 500 });
  }
};

// get all short url
export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  try {
    const urls = await ShortUrl.find({ userId });
    console.log("GET api/shortUrls-> Done");
    return Response.json(urls, { status: 200 });
  } catch (error) {
    console.log("GET api/shortUrls-> Error: ", error);
    return Response.json(error.message, { status: 500 });
  }
};
