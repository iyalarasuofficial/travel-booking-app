import React, { useEffect, useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TravelCard() {
  const [destinations, setDestinations] = useState([]);
  
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get(ApiRoutes.FETCH_DESTINATIONS.path);
        setDestinations(response.data); // Assuming the API returns the destinations in `response.data`
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const settings = {
    dots: true, // Disable navigation dots
    infinite: true, // Loop slides infinitely
    speed: 3000, // Transition speed in ms
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true, // Enable automatic scrolling
    autoplaySpeed: 100, // Delay between scrolls in ms
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="carousel-container overflow-hidden pb-5 bg-gray-100">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-5 mx-auto mt-5 text-center">Our Featured Tour</h2>

      <Slider {...settings}>
        {destinations.map((destination) => (
          <div
            key={destination._id}
            className="max-w-xs rounded-lg border border-pink-200 shadow-md overflow-hidden bg-white mx-5"
          >
            <div className="relative h-40">
              <img
                src={destination.images[0]}
                alt={destination.name}
                className="absolute w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <span className="text-xs font-semibold text-gray-800 uppercase ">
                {destination.location}
              </span>

              <h2 className="mt-1 text-sm font-bold text-gray-800 truncate">
                <a href={`/destination/${destination._id}`} className="hover no-underline text-yellow-500">
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
                className="mt-4 block w-full text-center bg-pink-600 text-white py-1.5 text-xs rounded-md hover:bg-gray-700 no-underline"
              >
                Book
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TravelCard;
