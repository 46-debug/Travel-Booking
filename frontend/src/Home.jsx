import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the backend using Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/form");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-600 p-4 rounded shadow-lg">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Tour Packages</h1>
      {data.length === 0 ? (
        <p className="text-center">No packages available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="relative rounded-lg shadow-md overflow-hidden bg-gray-100 hover:shadow-lg transition duration-300"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.images[0]})`,
                }}
              ></div>
              <div className="p-4 flex flex-col justify-between h-32">
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">Price: {item.price}</p>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/details/${item._id}`} className="flex-1">
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
