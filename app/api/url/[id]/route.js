import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";
import cloudinary from "@/utils/cloudinary";
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
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadedFile = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "og-covers",
              filename_override: file.filename,
              format: file.type.split("/").at(-1),
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            },
          )
          .end(buffer);
      });
      query.metadata["ogCover"] = uploadedFile.secure_url;
    }
    await dbConnect();
    const url = await UrlModel.findOne({ _id: id, userId });
    if (!url) {
      return Response.json("Not found", { status: 400 });
    }
    await UrlModel.findByIdAndUpdate(id, query, {
      new: true,
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err.message, { status: 500 });
  }
};
