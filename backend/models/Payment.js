import mongoose from 'mongoose';
const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "users" },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookings" },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["card", "wallet", "netbanking", "UPI", "paypal"],
    },
    paymentStatus: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    transactionId: { type: String },//razor id
    orderId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('payment', PaymentSchema );

