import { Schema, model, models } from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new Schema({
    original_url: String,
    short_url: {
        type: String,
        default: () => nanoid(6)
    },
    clicks: {
        type: Number,
        default: 0
    },
    qrcode: String,
    userId: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ShortUrl = models.shorturl || model("shorturl", shortUrlSchema);

export default ShortUrl;