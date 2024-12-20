import React, { useState } from "react";
import AddData from "./AddData";
import DeleteData from "./DeleteData";
import UpdateData from "./UpdateData";
import Bookings from "./Bookings";

// Success Component to render when credentials are correct
const SuccessComponent = () => {
  return (
    <div className="flex flex-col gap-6 p-2 bg-white rounded-lg">
      <AddData />
      <DeleteData />
      <UpdateData />
      <Bookings />
    </div>
  );
};

const Admin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false); // State to track successful login

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (formData.username === "sumit" && formData.password === "qwerty") {
      setError(""); // Clear error message
      setIsAuth(true); // Set successful authentication
    } else {
      setError("Incorrect username or password");
      setIsAuth(false); // Reset on incorrect login
    }
  };

  return (
    <div className="flex items-center justify-center p-1 min-h-screen bg-white">
      <div className="w-screen p-2 bg-white flex justify-center">
        {isAuth ? (
          <SuccessComponent />
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Admin Login</h2>
            <label className="block">
              <span className="text-gray-700 font-medium">Username</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </label>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admin;

