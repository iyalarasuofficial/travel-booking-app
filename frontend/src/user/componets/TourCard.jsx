import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";

function TourCard() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState(""); // Search input state
  const navigate = useNavigate();

  // Fetch destinations with optional search query
 const fetchDestinations = async (query = "") => {
  try {
    const response = await api.get(`${ApiRoutes.FETCH_DESTINATIONS.path}?search=${query}`);
    if (response.data && response.data.length > 0) {
      setDestinations(response.data);
    } else {
      console.log("No destinations found.");
      setDestinations([]);
    }
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
    console.error("Full error details:", error);  // Log the full error for more info
  }
};


  // Fetch all destinations on component mount
  useEffect(() => {
    fetchDestinations();
   
  }, []);
  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchDestinations(query); // Trigger live search
  };

  return (
    <div className="lg:mx-5 px-1 bg-pink mb-8 mt-3">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Our Featured Tours
      </h2>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange} // Live search on input change
          placeholder="Search for tour place or location city..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:outline-none"
        />
        <button
          className="ml-4 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          onClick={() => fetchDestinations(search)} // Optional: Trigger search explicitly
        >
          Search
        </button>
      </div>

      {/* Grid container for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <div
              key={destination._id}
              className="rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white"
            >
              <div className="relative h-40">
                <img
                  src={destination.images[0]}
                  alt={destination.name}
                  className="absolute w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <span className="text-xs font-semibold text-gray-800 uppercase">
                  {destination.location}
                </span>

                <h2 className="mt-1 text-sm font-bold text-gray-800 truncate">
                  <a
                    href={`/destination/${destination._id}`}
                    className="hover no-underline text-yellow-500"
                  >
                    {destination.name}
                  </a>
                </h2>

                <div className="mt-2 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-600">From</span>
                    <span className="ml-1 font-bold text-green-600">
                      ${destination.pricePerGuest}
                    </span>
                  </div>
                  <div className="text-gray-600">{destination.days} Days</div>
                </div>

                {destination.isAvailable ? (
                  <p className="mt-2 text-sm text-green-600">Available</p>
                ) : (
                  <p className="mt-2 text-sm text-red-600">Not Available</p>
                )}

                <button
                  onClick={() => navigate(`/destination/${destination._id}`)}
                  className="mt-4 block w-full text-center bg-pink-600 text-white py-1.5 text-xs rounded-md hover:bg-gray-700 no-underline"
                >
                  Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No destinations found.</p>
        )}
      </div>
    </div>
  );
}

export default TourCard;
