import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    role: { type: String, default: "user" }, // e.g., "user", "admin"
    
    // Add fields for password reset token and expiration
    passwordResetToken: { type: String },
    passwordResetTokenExpiration: { type: Date },
  },
  { timestamps: true }
);

// Avoid re-compiling the model if it already exists in mongoose.models
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
