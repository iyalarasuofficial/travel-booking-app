import Review from '../models/Review.js';
import User from '../models/User.js'; // Import User model

export const createReview = async (req, res) => {
  try {
    const { destination, rating, comment } = req.body;
    const userId = req.user.id; // Assuming `req.user.id` is populated by authentication middleware

    if (!destination || !rating || !comment) {
      return res.status(400).json({ message: 'All fields (destination, rating, comment) are required' });
    }

    // Find the user by ID to get their username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new review with the full user object (userId and username)
    const review = new Review({
      destination,
      user: { userId: user.id, username: user.username,photo:user.photo },  // Store the user object
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating review', error: error.message });
  }
};



// Get all reviews for a specific destinatio
export const getReviewsForDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const reviews = await Review.find({ destination: destinationId }).populate(
      'user',
      'name'
    );

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        : 0;

    res.status(200).json({
      totalReviews,
      averageRating: averageRating.toFixed(1),
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const user = req.user.id; // Assuming `req.user` is populated by `verifyAuth`

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== user) {
      return res.status(403).json({ message: 'Unauthorized to update this review' });
    }

    review.comment = comment || review.comment;
    review.rating = rating || review.rating;

    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id; // Assuming `req.user` is populated by `verifyAuth`

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== user) {
      return res.status(403).json({ message: 'Unauthorized to delete this review' });
    }

    await review.remove();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
