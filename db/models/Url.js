import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    actualUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: false,
    },
    dailyClicks: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
);
const UrlModel = mongoose?.models?.Url || mongoose.model("Url", urlSchema);
export default UrlModel;
