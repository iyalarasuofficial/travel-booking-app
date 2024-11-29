import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    travelDate: { type: Date, required: true },
    returnDate: { type: Date },
    destination: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    status: { type: String, default: "pending" }, // e.g., "pending", "confirmed", "canceled"
    totalCost: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
