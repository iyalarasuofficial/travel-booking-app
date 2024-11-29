import User from '../models/user.js'; // Assuming your model is in the `models` directory
import bcrypt from 'bcryptjs';
import auth from '../utlis/auth.js';

// Signin Function
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
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

// export const someProtectedController = (req, res) => {
//   // Access user information from the verified token, available in req.user
//   const { id, email, role } = req.user;

//   // Respond with a message or data for authenticated users
//   res.status(200).json({
//     message: "You have accessed a protected route!",
//     user: {
//       id,
//       email,
//       role,
//     },
//   });
// };

