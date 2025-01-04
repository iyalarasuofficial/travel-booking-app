import React, { useEffect, useState } from "react";

function TourCard() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/destinations");
        const data = await response.json();
        console.log(data);
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="container mx-auto px-1">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Our Featured Tours
      </h2>

      {/* Grid container for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
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
              <span className="text-xs font-semibold text-gray-500 uppercase">
                {destination.location}
              </span>

              <h2 className="mt-1 text-sm font-bold text-gray-800 truncate">
                <a href={`/destination/${destination._id}`} className="hover:underline">
                  {destination.name}
                </a>
              </h2>

              <div className="mt-2 flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600">From</span>
                  <span className="ml-1 font-bold text-green-600">${destination.pricePerGuest}</span>
                </div>
                <div className="text-gray-600">{destination.days} Days</div>
              </div>

              {destination.isAvailable ? (
                <p className="mt-2 text-sm text-green-600">Available</p>
              ) : (
                <p className="mt-2 text-sm text-red-600">Not Available</p>
              )}

              <a
                href={`/destination/${destination._id}`}
                className="mt-4 block w-full text-center bg-blue-600 text-white py-1.5 text-xs rounded-md hover:bg-blue-700 no-underline"
              >
                Book 
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourCard;
