import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    description: { type: String }, 
    location: { type: String, required: true }, 
    pricePerGuest: { type: Number, required: true }, // Price per guest
    images: [{ type: String }], // Array of image URLs
    isAvailable: { type: Boolean, default: true }, // Whether the destination is currently available
    days: { type: Number, required: true }, // Number of days for the destination
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
);

export default mongoose.model('Destination', destinationSchema);
