import React, { useState, useEffect } from "react";

const Bookings = () => {
  const [paxData, setPaxData] = useState([]);
  const [error, setError] = useState(null);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    // Fetch pax data
    fetch("http://localhost:5000/api/paxInfo")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching pax data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setPaxData(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-gray-50">
      <button
        className="bg-blue-500 text-white w-full max-w-96 px-5 py-2 "
        onClick={() => setShowBookings(!showBookings)}
      >
        {showBookings ? "Hide Bookings" : "View Bookings"}
      </button>

      {showBookings && (
        <div className="mt-5 w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Booking Information</h1>

          {error && (
            <p className="text-red-500 text-sm mb-4">Error: {error}</p>
          )}

          {paxData.length === 0 ? (
            <p className="text-gray-600 text-center">No bookings available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paxData.map((pax) => (
                <div
                  key={pax._id}
                  className="p-4 border rounded-md shadow-sm bg-gray-50 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-700">{pax.name}</h3>
                  <p className="text-gray-600 text-sm">Email: {pax.email}</p>
                  <p className="text-gray-600 text-sm">Phone: {pax.number}</p>
                  <p className="text-gray-600 text-sm">Travelers: {pax.travelers}</p>
                  <p className="text-gray-600 text-sm">Location: {pax.location}</p>
                  <p className="text-gray-600 text-sm">
                    Start Date: {new Date(pax.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm">Price: ₹{pax.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookings;
