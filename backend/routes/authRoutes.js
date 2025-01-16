import { signin, forgotPassword, resetPassword } from '../controller/authController.js';
import express from 'express';
import { check } from 'express-validator';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

// Signin Route
router.post('/', signin);

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post(
  '/reset-password',
  [
    check('resetToken').not().isEmpty().withMessage('Reset token is required'),
    check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  resetPassword
);

export default router;
