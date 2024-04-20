import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";
import { auth } from "@clerk/nextjs";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  if (!id) {
    return Response.json("Id's required.", { status: 400 });
  }
  const { userId } = auth();
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  try {
    await dbConnect();
    const url = await UrlModel.findById(id);
    if (!url) {
      return Response.json("Not found", { status: 400 });
    }
    await UrlModel.findOneAndDelete({ _id: id });
    return Response.json(true, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err.message, { status: 500 });
  }
};
export const GET = async (request, { params }) => {
  console.log("hello get");
  const { id } = params;
  if (!id) {
    return Response.json("Id's required.", { status: 400 });
  }
  const { userId } = auth();
  console.log({ userId });
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  try {
    await dbConnect();
    const url = await UrlModel.findOne({ _id: id, userId });
    console.log(url);
    if (!url) {
      return Response.json("Not found", { status: 400 });
    }
    return Response.json(url, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err.message, { status: 500 });
  }
};
