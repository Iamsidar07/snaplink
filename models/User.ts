import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: String,
    image: String,
    email: String,
})

const User = models.User || model("user", userSchema);

export default User;