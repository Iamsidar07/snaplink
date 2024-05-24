import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
dbConnect();

export const GET = async (req) => {
  try {
    const results = await ClickLog.aggregate([
      {
        $group: {
          _id: "$location.city",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Optional: Sort by count descending
      },
    ]);

    return Response.json(results, { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
};
