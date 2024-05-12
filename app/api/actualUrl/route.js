import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";

export const POST = async (req) => {
  const reqBody = await req.json();
  const { id, location, devices } = reqBody;
  if (!id) {
    return Response.json("id is required", { status: 400 });
  }
  const shortUrl = `${process.env.DOMAIN}/s/${id}`;

  try {
    await dbConnect();
    const existingUrl = await UrlModel.findOne({ shortUrl });
    if (!existingUrl) {
      return Response.json("Url does not exist.", { status: 404 });
    }
    const newUrl = await UrlModel.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicks: 1 } },
      { new: true },
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newUrl.dailyClicks.length === 0) {
      console.log("NEW:");
      newUrl.dailyClicks.push({
        date: today,
        count: 1,
        location: [location],
        devices: [devices],
      });
    } else {
      const todayIndex = newUrl.dailyClicks.findIndex(
        (item) =>
          item.date.toString().split("T")[0] == today.toString().split("T")[0],
      );
      if (todayIndex === -1) {
        console.log("NOT in ARRAY:");
        newUrl.dailyClicks.push({
          date: today,
          count: 1,
          location: [location],
          devices: [devices],
        });
      } else {
        console.log("INCREASE:");
        newUrl.dailyClicks[todayIndex].count++;
        newUrl.dailyClicks[todayIndex].location.push(location);
        newUrl.dailyClicks[todayIndex].devices.push(devices);
      }
    }
    await newUrl.save();
    return Response.json({ url: newUrl.actualUrl }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(error.message, { status: 500 });
  }
};
export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return Response.json("id is required", { status: 400 });
  }
  const shortUrl = `${process.env.DOMAIN}/s/${id}`;

  try {
    await dbConnect();
    const result = await UrlModel.findOne({ shortUrl });
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error.message, { status: 500 });
  }
};
