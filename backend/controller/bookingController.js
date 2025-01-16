import Booking from '../models/Booking.js';
import Destination from '../models/Destination.js';
import { sendBookingConfirmationEmail } from '../utlis/emailService.js';


export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, travelDate, destination, numberOfGuests, totalCost } = req.body;

    if (!name || !email || !phone || !travelDate || !destination || !numberOfGuests || !totalCost) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const destinationDetails = await Destination.findById(destination);
    if (!destinationDetails) {
      return res.status(404).json({ message: "Destination not found" });
    }
    const booking = new Booking({
      user: req.user.id,
      name,
      email,
      phone,
      travelDate,
      destination,
      numberOfGuests,
      totalCost,
    });

    // Save the booking to the database
    const savedBooking = await booking.save();

    // Populate destination details before responding
    const populatedBooking = await savedBooking.populate("destination", "name location images");

    // Send booking confirmation email
    await sendBookingConfirmationEmail(email, {
      name,
      travelDate,
      destination:destinationDetails.name,
      numberOfGuests,
      totalCost,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
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
    console.log("Fetching booking details by user ID");

    // Get the user ID from the authentication middleware
    const userId = req.user.id; // Ensure `req.user.id` is set by your auth middleware
    console.log("User ID:", userId);

    // Find all bookings for the authenticated user and populate destination details
    const bookings = await Booking.find({ user: userId })
      .populate("destination", "name location images") // Include only specific fields from Destination
      .populate("user", "name email"); // Optionally populate user details

    // Check if the bookings exist
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    // Respond with the booking details
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Error fetching booking", error: error.message });
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