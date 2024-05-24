import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
dbConnect();

export const GET = async (req) => {
  try {
    const os = await ClickLog.aggregate([
      {
        $group: {
          _id: "$os",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Optional: Sort by count descending
      },
    ]);
    const browser = await ClickLog.aggregate([
      {
        $group: {
          _id: "$browser",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Optional: Sort by count descending
      },
    ]);
    const device = await ClickLog.aggregate([
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Optional: Sort by count descending
      },
    ]);
    const results = { os, browser, device };
    return Response.json(results, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
};
