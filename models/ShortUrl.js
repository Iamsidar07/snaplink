import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: false,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const ShortUrl =
  mongoose?.models?.ShortUrl || mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;
