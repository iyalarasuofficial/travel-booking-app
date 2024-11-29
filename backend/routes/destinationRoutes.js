import express from 'express';
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from '../controller/destinationController.js';

const router = express.Router();

router.post('/', createDestination); // Create a destination (Admin only)
router.get('/', getAllDestinations); // Get all destinations
router.get('/:id', getDestinationById); // Get destination by ID
router.put('/:id', updateDestination); // Update a destination (Admin only)
router.delete('/:id', deleteDestination); // Delete a destination (Admin only)

export default router;
