import express from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
  getReviewsForDestination,
} from '../controller/reviewController.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

// Routes for review management
router.post('/', verifyAuth, createReview);  // Create a review
router.get('/destination/:destinationId', getReviewsForDestination);  // Get reviews for a destination
router.put('/:id', verifyAuth, updateReview);  // Update a review by ID
router.delete('/:id', verifyAuth, deleteReview);  // Delete a review by ID

export default router;
