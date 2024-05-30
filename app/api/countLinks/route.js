import dbConnect from "@/db";
import ShortUrl from "@/models/ShortUrl";

export const GET = async (req) => {
  try {
    await dbConnect();
    const urlCount = await ShortUrl.countDocuments({});
    console.log("api/urlCount->GET");
    return Response.json(urlCount, { status: 200 });
  } catch (e) {
    console.log("ERROR: ", e);
    return Response.json(e.message, { status: 500 });
  }
};
