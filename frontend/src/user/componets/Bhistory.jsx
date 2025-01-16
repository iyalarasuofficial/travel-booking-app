import React, { useEffect, useState } from "react";
import api from "../../service/ApiService"; // API service that includes authentication headers
import ApiRoutes from "../../utils/ApiRoutes";

const Bhistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch booking history on component mount
    const fetchBookingHistory = async () => {
      try {
        const response = await api.get(ApiRoutes.GET_BOOKINGS_BY_USER_ID.path); // Ensure the endpoint is correct
        setBookings(response.data); // Update bookings state
      } catch (error) {
        const errorMsg = error.response ? error.response.data.message : error.message;
        setError(errorMsg || "An error occurred while fetching booking history.");
      }
    };

    fetchBookingHistory();
  }, []); // Run once on mount

  return (
    <div className="lg:mx-5 px-1">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Your Bookings History
      </h1>


      {/* Check if bookings exist */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5 ">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white"
            >
              {/* Destination Image */}
              <div className="relative h-40">
                <img
                  src={booking.destination?.images[0]|| "https://via.placeholder.com/150"} // Fallback image
                  alt={booking.destination?.name || "Destination"}
                  className="absolute w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Destination Name */}
                <h2 className="text-sm font-bold text-gray-800 truncate">
                  {booking.destination?.name || "Unknown Destination"}
                </h2>

                {/* Booking Details */}
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Travel Date:{" "}
                    <span className="font-semibold">
                      {new Date(booking.travelDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Booked Date:{" "}
                    <span className="font-semibold">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Number of Guests:{" "}
                    <span className="font-semibold">{booking.numberOfGuests}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Cost:{" "}
                    <span className="font-bold text-green-600">
                      ${booking.totalCost}
                    </span>
                  </p>
                </div>

                {/* Booking Status */}
                <p className="mt-2 text-sm font-semibold text-ash-600" >
                Booked
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default Bhistory;
