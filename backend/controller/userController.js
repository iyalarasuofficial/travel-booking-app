import User from '../models/User.js'; // Assuming your model is in the `models` directory
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../utlis/emailService.js'; // Import email service

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send a welcome email
    await sendWelcomeEmail(email, username);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user data
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const { username, email, password, profilePhoto } = req.body;

    // Prepare update data
    const updatedData = { username, email };
    if (profilePhoto) {
      updatedData.photo = profilePhoto; // Save the base64 string directly
    }
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10); // Hash the password if provided
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (user) {
      res.json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
