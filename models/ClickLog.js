import mongoose from "mongoose";

const clickLogSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShortUrl",
    },
    userId: {
      type: String,
      required: false,
    },

    time: { type: Date, default: Date.now },
    location: { type: String },
    os: { type: String },
    browser: { type: String },
    device: { type: String },
    referrer: {
      type: String,
    },
  },
  { timestamps: true },
);
const ClickLog =
  mongoose.models.ClickLog || mongoose.model("ClickLog", clickLogSchema);
export default ClickLog;
