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
app.use(express.json());
app.use(cors({}));

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth',authRoutes );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
    
});
