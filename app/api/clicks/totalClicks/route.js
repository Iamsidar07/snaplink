import { auth } from "@/auth";
import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
dbConnect();

export const GET = auth(async (req) => {
  const session = req.auth;
  const userId = session?.user?.id;
  try {
    const totalClicks = await ClickLog.find({ userId }).countDocuments();
    console.log("/api/clicks/totalClicks");
    return Response.json(totalClicks, { status: 200 });
  } catch (error) {
    console.log("Error: /api/clicks/totalClicks", error);
    return Response.json(error.message, { status: 500 });
  }
});
