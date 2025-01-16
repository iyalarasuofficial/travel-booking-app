import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";

function BookingForm({ destinationId, pricePerGuest }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfGuests: 1,
    travelDate: "",
  });
  const [totalCost, setTotalCost] = useState(pricePerGuest);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Update total cost when number of guests changes
      if (name === "numberOfGuests") {
        const guests = parseInt(value || 1, 10);
        setTotalCost(pricePerGuest * guests);
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   

    try {
      await api.post(ApiRoutes.BOOKING_SUMBIT.path, {
        ...formData,
        destination: destinationId, // Include the destination ID in the request
        totalCost,
      });
       toast.success("Booking successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        numberOfGuests: 1,
        travelDate: "",
      });
      setTotalCost(pricePerGuest);
    } catch (error) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-10  mt-4 bg-gray-100 p-6 rounded-lg shadow-md h-[620px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book This Tour</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <FaUser className="inline mr-2 text-gray-600" />
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <FaEnvelope className="inline mr-2 text-gray-600" />
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <FaPhone className="inline mr-2 text-gray-600" />
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <FaCalendarAlt className="inline mr-2 text-gray-600" />
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
            <FaUsers className="inline mr-2 text-gray-600" />
            Number of Guests
          </label>
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            min="1"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Cost
          </label>
          <p className="text-xl font-bold text-gray-800">${totalCost.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
