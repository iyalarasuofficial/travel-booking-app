import React, { useState, useEffect } from "react";
import { FaGlobe, FaMapMarkerAlt, FaClock, FaDollarSign } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import BookingForm from "./BookingForm";
import GalleryCard from "./GalleryCard";
import { TourHeroSection } from "./TourHeroSection";
import ReviewSection from "./ReviewSection";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";

function TourDetail({ destinationId }) {
  const [destinationDetails, setDestinationDetails] = useState(null);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const { data } = await api.get(
          `${ApiRoutes.FETCH_DESTINATION_BY_ID.path}/${destinationId}`
        );
        setDestinationDetails(data);
      } catch (error) {
        console.error("Error fetching destination details:", error);
      }
    };

    fetchDestinationDetails();
  }, [destinationId]);

  // Show the spinner while destination details are loading
  if (!destinationDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#E63946" size={60} />
      </div>
    );
  }

  return (
    <div className="lg:mx-5">
      <TourHeroSection destinationDetails={destinationDetails} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Left Side: Info, About, and Gallery */}
        <div className="md:col-span-2 space-y-12">
          {/* Info Section */}
          <section>
            <h2 className="text-4xl font-extrabold text-black-700 mb-4">Info</h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-2">
                <FaGlobe className="text-blue-500" />
                <strong>Language:</strong> {destinationDetails.language}
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <strong>Destination:</strong> {destinationDetails.location}
              </li>
              <li className="flex items-center gap-2">
                <FaClock className="text-green-500" />
                <strong>Duration:</strong> {destinationDetails.days} days
              </li>
              <li className="flex items-center gap-2">
                <FaDollarSign className="text-yellow-500" />
                <strong>Price:</strong> ${destinationDetails.pricePerGuest} per guest
              </li>
            </ul>
          </section>

          {/* About Section */}
          <section>
            <h2 className="text-4xl font-extrabold text-black-700 mb-4">About</h2>
            <p className="text-gray-600">{destinationDetails.description}</p>
          </section>

          {/* Gallery Section */}
          <GalleryCard destinationDetails={destinationDetails} />
          <ReviewSection destinationId={destinationId} />
        </div>

        {/* Right Side: Booking Form */}
        <BookingForm
          destinationId={destinationId}
          pricePerGuest={destinationDetails.pricePerGuest}
        />
      </div>
    </div>
  );
}

export default TourDetail;
