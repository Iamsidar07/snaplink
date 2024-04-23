import config from "@/config/config";
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
        shortUrl: `${config.domain}/s/${uniqueId}`,
        userId: userId ?? null,
        metadata: {
          title: "Shorten via snaplink",
          description: "This link is shorten by sanplink.",
          ogCover:
            "https://res.cloudinary.com/dc6yzmwrq/image/upload/v1713851114/og-covers/onupnqfjgytymgws66ma.png",
        },
      },
      { upsert: true, new: true },
    );
    return Response.json(newUrl, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(error.message, { status: 500 });
  }
};
