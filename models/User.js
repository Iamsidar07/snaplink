import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unqiue: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isPremiumMember: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose?.models?.User || mongoose.model("User", userSchema);
export default UserModel;
