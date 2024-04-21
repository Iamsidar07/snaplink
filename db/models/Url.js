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
    metadata: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    qrCodeFgColor: {
      type: String,
      default: "black",
    },
    qrCodeBgColor: {
      type: String,
      default: "white",
    },
  },
  { timestamps: true },
);
const UrlModel = mongoose?.models?.Url || mongoose.model("Url", urlSchema);
export default UrlModel;
