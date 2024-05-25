import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import { getAuth } from "@clerk/nextjs/server"
dbConnect();

export const GET = async (req) => {
  const { userId } = getAuth(req);
  console.log({ userId })
  try {
    const totalClicks = await ClickLog.find({ userId }).countDocuments();
    console.log("/api/clicks/totalClicks");
    console.log({ totalClicks })
    return Response.json(totalClicks, { status: 200 });
  } catch (error) {
    console.log("Error: /api/clicks/totalClicks", error);
    return Response.json(error.message, { status: 500 });
  }
};
