import paypal from 'paypal-rest-sdk';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import { sendBookingConfirmationEmail } from '../utlis/emailService.js';

// Configure PayPal
paypal.configure({
  mode: "sandbox", // Use "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Create a payment
export const createPayment = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    if (!amount || !bookingId) {
      return res.status(400).json({ message: "Missing required fields: amount or bookingId" });
    }

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5000/api/payments/success",
        cancel_url: "http://localhost:5000/api/payments/cancel",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: amount,
          },
          description: `Payment for booking ID ${bookingId}`,
        },
      ],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ message: "Payment creation failed" });
      } else {
        res.status(201).json({ paymentId: payment.id, approvalUrl: payment.links[1].href });
      }
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: error.message });
  }
};

// Execute a payment
export const executePayment = async (req, res) => {
  try {
    const { paymentId, PayerID, bookingId } = req.body;

    if (!paymentId || !PayerID || !bookingId) {
      return res.status(400).json({ message: "Missing required fields: paymentId, PayerID, or bookingId" });
    }

    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "10.00", // Update with the actual amount
          },
        },
      ],
    };

    paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
      if (error) {
        console.error("Error executing payment:", error.response);
        res.status(500).json({ message: "Payment execution failed" });
      } else {
        // Save payment details in the database
        const newPayment = new Payment({
          paymentId,
          bookingId,
          amount: payment.transactions[0].amount.total,
          paymentStatus: "success",
        });
        await newPayment.save();

        // Fetch associated booking details
        const booking = await Booking.findById(bookingId);
        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }

        // Send confirmation email
        const bookingDetails = {
          date: booking.travelDate,
          destination: booking.destination,
          totalAmount: payment.transactions[0].amount.total,
        };

        await sendBookingConfirmationEmail(req.user.email, bookingDetails);

        res.status(200).json({
          message: "Payment executed successfully and confirmation email sent",
          payment,
        });
      }
    });
  } catch (error) {
    console.error("Error executing payment:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel payment
export const cancelPayment = (req, res) => {
  res.status(200).json({ message: "Payment canceled" });
};
