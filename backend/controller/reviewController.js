import Review from "../models/Review.js"

// Create a new review
export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsForDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const reviews = await Review.find({ destination: destinationId }).populate('user', 'name');

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this destination" });
    }

    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

    res.status(200).json({
      totalReviews,
      averageRating: averageRating.toFixed(1),
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
