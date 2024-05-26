import { auth } from "@/auth";
import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
dbConnect();
// /api/clicks/overTime
export const GET = auth(async (req) => {
  const session = req.auth;
  const userId = session.user?.id;
  try {
    const clickLog = await ClickLog.aggregate([
      {
        $match: {
          userId,
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
    console.log("api/shortUrls/id/clicks/overTime");
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
