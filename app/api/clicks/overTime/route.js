import { auth } from "@/auth";
import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import mongoose from "mongoose";
dbConnect();
// /api/clicks/overTime
export const GET = auth(async (req) => {
  const session = req.auth;
  const userId = session.user?.id;
  if (!userId) return Response.json("Unauthorized", { status: 403 });
  try {
    const clickLog = await ClickLog.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$time" },
          },
          clicks: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          time: "$_id",
          clicks: 1,
        },
      },
    ]);
    console.log("api/clicks/overTime", clickLog);
    return Response.json(clickLog, { status: 200 });
  } catch (error) {
    console.log(
      `ERROR: api/shortUrls/id/clicks
`,
      error,
    );
    return Response.json(error.message, { status: 500 });
  }
});
