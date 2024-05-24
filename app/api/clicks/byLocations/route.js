import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
import { auth } from "@clerk/nextjs";
dbConnect();

export const GET = async (req) => {
  console.log("getting req: ", req.pathname);
  try {
    const { userId } = auth();
    const links = await ClickLog.find({ userId });
    const cityCount = {};
    const countryCount = {};
    links.map((link) => {
      const [city, country] = link.location.split(",").map((r) => r.trim());
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
        Object.entries(cityCount).map(([loc, _count]) => {
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
};