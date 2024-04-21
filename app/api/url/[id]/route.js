import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";
import cloudinary from "@/utils/cloudinary";
import { auth } from "@clerk/nextjs";
import fs from "fs/promises";

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

export const PATCH = async (request, { params }) => {
  const { qrCodeFgColor, qrCodeBgColor, title, description } =
    await request.json();
  console.log("PATCH:", request.file, request.body, request.files);
  // TODO: verifiy
  const file = request.file;

  //TODO: upload image
  const query = {
    metadata: {},
  };
  if (qrCodeBgColor) {
    query["qrCodeBgColor"] = qrCodeBgColor;
  }
  if (qrCodeFgColor) {
    query["qrCodeFgColor"] = qrCodeFgColor;
  }
  if (title) {
    query.metadata["title"] = title;
  }
  if (description) {
    query.metadata["description"] = description;
  }

  const { id } = params;
  if (!id) {
    return Response.json("Id's required.", { status: 400 });
  }
  const { userId } = auth();
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  try {
    let uploadedFile = null;
    if (file) {
      uploadedFile = await cloudinary.uploader.upload(file.path, {
        filename_override: file.filename,
        folder: "og-covers",
        mimetype: file.mimetype.split("/").at(-1),
      });
      query.metadata["ogCover"] = uploadedFile.secure_url;
      await fs.unlink(file.path);
    }
    await dbConnect();
    const url = await UrlModel.findOne({ _id: id, userId });
    if (!url) {
      return Response.json("Not found", { status: 400 });
    }
    const updatedUrl = await UrlModel.findByIdAndUpdate(id, query, {
      new: true,
    });
    return Response.json(updatedUrl, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err.message, { status: 500 });
  }
};
