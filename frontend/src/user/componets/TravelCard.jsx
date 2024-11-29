import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TravelCard() {
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

  const settings = {
    dots: true, // Disable navigation dots
    infinite: true, // Loop slides infinitely
    speed: 500, // Transition speed in ms
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
    <div className="carousel-container">
     <h2 className="text-4xl font-extrabold text-gray-800 mb-4 mx-auto text-center">Our Featured Tour</h2>

      <Slider {...settings}>
        {destinations.map((destination) => (
          <div
            key={destination._id}
            className="max-w-xs rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white"
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
                className="mt-4 block w-full text-center bg-blue-600 text-white py-1.5 text-xs rounded-md hover:bg-blue-700"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TravelCard;
