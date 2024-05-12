import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
  city: { type: String },
  country: { type: String },
});
const deviceSchema = new mongoose.Schema({
  osName: { type: String },
  browserName: { type: String },
  deviceType: { type: String },
});

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
        location: [
          {
            city: { type: String },
            country: { type: String },
          },
        ],
        devices: [
          {
            osName: { type: String },
            browserName: { type: String },
            deviceType: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);
const UrlModel = mongoose?.models?.Url || mongoose.model("Url", urlSchema);
export default UrlModel;
