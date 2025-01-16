import User from '../models/user.js'; // Assuming your model is in the `models` directory
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { sendWelcomeEmail } from '../utlis/emailService.js'; // Import email service
// To send the email

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix); // Ensure unique file names
  }
});

const upload = multer({ storage: storage }).single('profilePhoto'); // Handle single file upload



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
    res.json(user); // Return user data, including profile picture
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading profile photo' });
    }

    try {
      const { username, email, password } = req.body;
      let photo = req.file ? req.file.path : req.body.profilePhoto; // If file is uploaded, save the file path
console.log(photo)
      const updatedData = { username, email, photo };

      // If password is provided, hash it
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
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
  });
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
