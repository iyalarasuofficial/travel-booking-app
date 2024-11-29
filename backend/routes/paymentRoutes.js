import express from 'express';
import paymentController from '../controller/paymentController.js';
import auth from '../middleware/verifyAuth.js'; // Ensure you have authentication middleware

const router = express.Router();

// Route to create a PayPal payment
router.post('/create', auth, paymentController.createPayment);

// Route to handle PayPal payment success
router.get('/success', auth, paymentController.paymentAndBookingSuccess);

// Route to handle PayPal payment cancellation
router.get('/cancel', auth, paymentController.paymentCancel);

export default router;
