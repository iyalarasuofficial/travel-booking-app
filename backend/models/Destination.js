
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    pricePerGuest: { type: Number, required: true },
    images: [{ type: String }], // Array of image URLs
    isAvailable: { type: Boolean, default: true },
    days: { type: Number, required: true },
    language: { type: String, default: "English" }
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
