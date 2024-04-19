import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";

export const POST = async (req) => {
  const reqBody = await req.json();
  const { url } = reqBody;

  // connect to db
  try {
    await dbConnect();
    const existingUrl = await UrlModel.findOne({ shortUrl: url });
    if (!existingUrl) {
      return Response.json("Url does not exist.", { status: 404 });
    }
    const newUrl = await UrlModel.findOneAndUpdate(
      { shortUrl: url },
      { $inc: { clicks: 1 } },
      { new: true },
    );
    const today = new Date().setHours(0, 0, 0, 0);
    await UrlModel.updateOne(
      {
        shortUrl: url,
        "dailyClicks.date": today,
      },
      {
        $inc: { "dailyClicks.$.count": 1 },
      },
      { upsert: true },
    );
    return Response.json(newUrl, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(error.message, { status: 500 });
  }
};
