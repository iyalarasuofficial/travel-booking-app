import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();

// Increase payload size limit for handling large data (e.g., base64 images)
app.use(express.json({ limit: '50mb' })); // Increased to 50mb
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Allow all origins with CORS
app.use(cors({
  origin: '*',  // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow credentials (cookies, authorization headers)
}));
// Connect to the database
connectDB();

// API routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Start server on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
