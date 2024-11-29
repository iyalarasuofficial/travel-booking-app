import jwt from 'jsonwebtoken';
import Booking from '../models/Booking.js';
import { sendBookingConfirmationEmail } from '../utlis/emailService.js';
import auth from '../utlis/auth.js';

export const createBooking = async (req, res) => {
  try {
    const { travelDate, returnDate, destination, numberOfGuests, totalCost } = req.body;
    if (!travelDate || !destination || !numberOfGuests || !totalCost) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const booking = new Booking({
      user:req.user.id,
      travelDate,
      returnDate,
      destination,
      numberOfGuests,
      totalCost,
    });
    await booking.save();

    const bookingDetails = {
      date: booking.travelDate,
      destination: booking.destination,
      totalAmount: booking.totalCost,
    };

    await sendBookingConfirmationEmail(req.user.email, bookingDetails);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById({ user: req.user.id });
    console.log(req.user.id)
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
