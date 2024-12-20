import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [item, setItem] = useState(null);

  const [paxData, setPaxData] = useState({
    name: "",
    email: "",
    number: "",
    travelers: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaxData({ ...paxData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/form/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...paxData,
      location: item.title,
      startDate: item.availableDates,
      price: paxData.travelers * item.price,
    };

    try {
      const response = await fetch("http://localhost:5000/api/paxInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Booking Successful");
        setModalVisibility(false);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="relative">
          <div className="flex overflow-auto space-x-2 p-2">
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="h-64 w-auto rounded-md border border-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="p-3">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h2>
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {item.description}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Price:</strong> ₹{item.price} /person
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Available Date:</strong> {new Date(item.availableDates).toLocaleDateString()}
          </p>
        </div>

        <div className="p-6 border-t flex justify-end space-x-4">
          <button
            onClick={() => setModalVisibility(true)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Book Now
          </button>
          <Link to="/">
            <button
              className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition"
            >
              Back
            </button>
          </Link>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Submit Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={paxData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={paxData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Phone Number:</label>
                <input
                  type="text"
                  name="number"
                  value={paxData.number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Travelers:</label>
                <input
                  type="number"
                  name="travelers"
                  value={paxData.travelers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Location:</label>
                <input
                  name="location"
                  value={item.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-700">
                  <strong>Total Price:</strong> ₹{paxData.travelers * item.price}
                </p>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalVisibility(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
