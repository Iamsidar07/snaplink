import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import { auth } from "@clerk/nextjs";
dbConnect();
// /api/clicks/overTime
export const GET = async (req) => {
  const { userId } = auth();
  try {
    const totalClicks = await ClickLog.find({ userId }).countDocuments();
    console.log("/api/clicks/totalClicks");
    return Response.json(totalClicks, { status: 200 });
  } catch (error) {
    console.log("Error: /api/clicks/totalClicks", error);
    return Response.json(error.message, { status: 500 });
  }
};
