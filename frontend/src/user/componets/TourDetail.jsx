import React, { useState, useEffect } from "react";

function TourDetail() {
  const [destinationDetails, setDestinationDetails] = useState(null);
  const [formData, setFormData] = useState({
    travelDate: "",
    returnDate: "",
    numberOfGuests: 1,
    totalCost: 0,
  });

  const destinationId="673ec6b8a41f34306eabfaed"
  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/destinations/${destinationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch destination details');
        }
        const data = await response.json();
        setDestinationDetails(data);
        setFormData((prevData) => ({
          ...prevData,
          totalCost: data.pricePerGuest,
        }));
      } catch (error) {
        console.error("Error fetching destination details:", error);
      }
    };

    fetchDestinationDetails();
  }, [destinationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "numberOfGuests") {
      setFormData((prev) => ({
        ...prev,
        totalCost: destinationDetails.pricePerGuest * value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          destination: destinationDetails.name,
          user: "USER_ID", // Replace with logged-in user ID
        }),
      });
      if (!response.ok) throw new Error("Failed to book");
      alert("Booking successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!destinationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* About Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          {destinationDetails.name}
        </h1>
        <p className="text-gray-600">{destinationDetails.description}</p>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800">Tour Info</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Language:</strong> {destinationDetails.language}
            </li>
            <li>
              <strong>Duration:</strong> {destinationDetails.days} days
            </li>
            <li>
              <strong>Destination:</strong> {destinationDetails.location}
            </li>
            <li>
              <strong>Price:</strong> ${destinationDetails.pricePerGuest} per guest
            </li>
          </ul>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Book This Tour
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Travel Date
            </label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Cost
            </label>
            <p className="text-xl font-bold text-gray-800">
              ${formData.totalCost.toFixed(2)}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default TourDetail;
