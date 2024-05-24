import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import mongoose from "mongoose";
dbConnect();
// api/shortUrls/id/clicks/overTime
export const GET = async (req) => {
  console.log("Id:", req.params);
  const id = "";
  try {
    const clickLog = await ClickLog.aggregate([
      {
        $match: {
          urlId: mongoose.Types.ObjectId(id),
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
          date: "$_id",
          clicks: 1,
        },
      },
    ]);
    console.log("clickLog:", clickLog);
    console.log("api/shortUrls/id/clicks/overTime");
    return Response.json(clickLog, { status: 500 });
  } catch (error) {
    console.log(
      `ERROR: api/shortUrls/id/clicks
`,
      error,
    );
    return Response.json(error.message, { status: 500 });
  }
};
