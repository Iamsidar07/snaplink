import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import ShortUrl from "@/models/ShortUrl";

dbConnect();
export const POST = async (req) => {
  const requestBody = await req.json();
  const { urlId, country, city, os, browser, device, referrer } = requestBody;
  if (!urlId || !country || !city || !os || !browser || !device) {
    return Response.json("Missing fields...", { status: 400 });
  }
  const location = city + ", " + country;
  try {
    const shortUrl = await ShortUrl.findOne({
      shortUrl: urlId,
    });
    if (!shortUrl)
      return Response.json("Short URL not found.", { status: 404 });
    await ShortUrl.findOneAndUpdate(
      { shortUrl: urlId },
      {
        $inc: { clicks: 1 },
      },
      { new: true, upsert: true },
    );

    await ClickLog.create({
      urlId: shortUrl._id,
      userId: shortUrl?.userId,
      location,
      os,
      browser,
      device,
      referrer,
    });
    return Response.json(
      { originalUrl: shortUrl.originalUrl },
      { status: 200 },
    );
  } catch (error) {
    console.log("POST api/clicks-> Error: ", error);
    return Response.json(error.message, { status: 500 });
  }
};
