import express from 'express';
import verifyAuth from '../middleware/verifyAuth.js';

import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from '../controller/bookingController.js';

const router = express.Router();

// Route to create a new booking
router.post("/", verifyAuth, createBooking);

// Route to get all bookings
router.get("/", verifyAuth, getAllBookings);

// Route to get a booking by ID
router.get("/id", verifyAuth, getBookingById);

// Route to update a booking by ID
router.put("/:id", verifyAuth, updateBooking);

// Route to delete a booking by ID
router.delete("/:id",verifyAuth, deleteBooking);

export default router;
