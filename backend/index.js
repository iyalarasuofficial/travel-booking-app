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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS configuration to allow all origins, methods, and headers
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins dynamically
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow standard methods
  allowedHeaders: '*', // Allow any headers sent by the client
  credentials: true, // Allow credentials (cookies, tokens, etc.)
}));

// Handle preflight requests
app.options('*', cors());

// Connect to the database
connectDB();

// API routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
