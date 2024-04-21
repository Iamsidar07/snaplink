import config from "@/config/config";
import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(config.mongodbUri);
    connection.connection.on("connection", () => {
      console.log("connected db.");
    });
  } catch (err) {
    console.log("Failed to connect to db.", err.message);
  }
};
export default dbConnect;
