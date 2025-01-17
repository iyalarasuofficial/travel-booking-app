import User from '../models/User.js'; // Assuming your model is in the `models` directory
import bcrypt from 'bcryptjs';
import auth from '../utlis/auth.js';
import crypto from 'crypto'; // To generate a secure reset token
import { sendPasswordResetEmail,sendPasswordResetConfirmationEmail  } from '../utlis/emailService.js';

// Signin Function
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = auth.createToken({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    });
      

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email.' });
    }

    // Generate a token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    // Save the token and expiration time in the database
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiration = resetTokenExpiration;
    console.log(user.passwordResetToken);
    console.log(user.passwordResetTokenExpiration);
    await user.save();

    // Create the reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Send the email with the reset link
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    console.log(resetToken);

    // Find the user by the reset token
    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetTokenExpiration: { $gt: Date.now() }, // Check if the token is still valid (not expired)
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password
    user.password = hashedPassword;

    // Clear reset token fields
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;

    // Save the updated user record
    await user.save();

    // Send confirmation email to the user
    await sendPasswordResetConfirmationEmail(user.email); // Call email service to notify user

    res.status(200).json({ message: 'Password successfully reset.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Password reset failed.' });
  }
};
