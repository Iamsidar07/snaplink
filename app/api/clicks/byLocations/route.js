import { auth } from "@/auth";
import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import mongoose from "mongoose";
dbConnect();

export const GET = auth(async (req) => {
  try {
    const session = req.auth;
    const userId = session.user?.id;
    if (!userId) return Response.json("Unauthorized", { status: 403 });
    const links = await ClickLog.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    const cityCount = {};
    const countryCount = {};
    links.map((link) => {
      const [city, country] = link.location.split(",");
      
      if (!Object.keys(cityCount).join(",").split(",").includes(city)) {
        cityCount[link.location] = 1;
      } else {
        Object.entries(cityCount).map(([loc, _count]) => {
          if (loc.split(",").includes(city)) {
            cityCount[loc] += 1;
          }
        });
      }

      if (!Object.keys(countryCount).join(",").split(",").includes(country)) {
        countryCount[link.location] = 1;
      } else {
        Object.entries(countryCount).map(([loc, _count]) => {
          if (loc.split(",").includes(country)) {
            countryCount[loc] += 1;
          }
        });
      }
    });

    return Response.json(
      { city: cityCount, country: countryCount },
      { status: 200 },
    );
  } catch (error) {
    console.log("failed", error);
    return Response.json(error.message, { status: 500 });
  }
});
