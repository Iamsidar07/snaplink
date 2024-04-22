import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";
import cloudinary from "@/utils/cloudinary";
import { auth } from "@clerk/nextjs";
import fs from "fs/promises";
import path from "path";

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
  const { id } = params;
  if (!id) {
    return Response.json("Id's required.", { status: 400 });
  }
  try {
    await dbConnect();
    const url = await UrlModel.findOne({ _id: id });
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
  const data = await request.formData();
  const title = data.get("title");
  const description = data.get("description");
  const file = data.get("file");
  const qrCodeFgColor = data.get("qrCodeFgColor");
  const qrCodeBgColor = data.get("qrCodeBgColor");

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
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filepath = path.join(
        "public/uploads/",
        new Date().getTime().toString() + "_" + file.name,
      );

      await fs.writeFile(filepath, buffer);

      uploadedFile = await cloudinary.uploader.upload(filepath, {
        filename_override: file.name,
        folder: "og-covers",
        mimetype: file.type.split("/").at(-1),
      });
      query.metadata["ogCover"] = uploadedFile.secure_url;
      await fs.unlink(filepath);
    }
    await dbConnect();
    const url = await UrlModel.findOne({ _id: id, userId });
    if (!url) {
      return Response.json("Not found", { status: 400 });
    }
    const updatedUrl = await UrlModel.findByIdAndUpdate(id, query, {
      new: true,
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err.message, { status: 500 });
  }
};
