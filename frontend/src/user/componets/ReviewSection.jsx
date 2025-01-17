import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import api from "../../service/ApiService"; 
import ApiRoutes from "../../utils/ApiRoutes";
import defaultprofile from '../../assets/photos/defaultprofile.png'

function ReviewSection({ destinationId, loggedInUserId }) {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(null);
  const [message, setMessage] = useState(null);

// Fetch reviews for the destination
useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await api.get(`${ApiRoutes.FETCH_REVIEWS.path}/${destinationId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  if (destinationId) {
    fetchReviews();
  }
}, [destinationId]);

// Handle adding a review
const handleAddReview = async () => {
  if (newRating === null || !newComment.trim()) {
    setMessage("Please select a rating and enter a comment.");
    return;
  }

  try {
    const response = await api.post(ApiRoutes.ADD_REVIEW.path, {
      destination: destinationId,
      rating: newRating,
      comment: newComment,
      userId: loggedInUserId,
    });
    setReviews([...reviews, response.data.review]); // Add the new review to the state
    setNewComment("");
    setNewRating(null);
    setMessage(null);
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

// Render star rating component
const renderStarRating = (rating, onClick) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={24}
        className={index < rating ? "text-yellow-500" : "text-gray-300"}
        onClick={() => onClick && onClick(index + 1)}
        style={{ cursor: onClick ? "pointer" : "default" }}
      />
    ))}
  </div>
);

  return (
    <section className="flex w-full rounded-lg border-2 border-pink-600 p-4 my-8">
      <div className="w-full max-w-3xl"> {/* Allow review section to take up the remaining space */}
        <h3 className="font-os text-lg font-bold text-pink-800 mb-4">Leave a Comment</h3>
        
        {/* Reviews - Added Scroll */}
        <div className="max-h-40 w-full overflow-y-scroll">
          {reviews.map((review) => (
            <div key={review._id} className="flex mt-4 p-4 border-b-2 border-pink-600">
              <div className="w-14 h-14 rounded-full bg-pink-400/50 flex-shrink-0 flex items-center justify-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
      
                  src={review.user? `${import.meta.env.VITE_BASE_URL}/${review.user?.photo}` : defaultprofile}
                  alt={review.user?.username || "User"}
                />
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-800">{review.user?.username || "Unknown"}</div>
                {/* Only showing date */}
                <div className="text-gray-600">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2 text-pink-800">{review.comment}</div>
                {renderStarRating(review.rating)}
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border-2 border-pink-600 p-2 w-full rounded"
            placeholder="Your comment..."
          />
          <div className="mt-2">
            {renderStarRating(newRating, setNewRating)}
            {message && <p className="text-red-600">{message}</p>}
          </div>
          <button
            onClick={handleAddReview}
            className="bg-pink-700 text-white font-medium py-2 px-4 rounded hover:bg-pink-600 mt-2"
          >
            Add Review
          </button>
        </div>
      </div>

   
    </section>
  );
}

export default ReviewSection;
