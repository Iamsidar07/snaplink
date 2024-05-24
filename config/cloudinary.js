import config from "@/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinarySecretKey,
});

export default cloudinary;
