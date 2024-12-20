import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddData = () => {
  const [hight, setHight] = useState("0px");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: new Date(),
    images: [""],
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, availableDates: date });
  };

  const handleImageUrlChange = (index, e) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] }); // Dynamically add input fields for image URLs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      availableDates: formData.availableDates,
      images: formData.images.filter((url) => url.trim() !== ""), // Exclude empty URLs
    };

    try {
      const response = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Form data submitted successfully!");
      } else {
        console.error("Failed to submit form data");
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center flex-start">
        <button
          className="bg-green-500 text-white w-full max-w-96 px-5 py-2 "
          onClick={() => setHight("100%")}
        >
          + Add Packages
        </button>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white overflow-hidden p-1"
          style={{ height: hight }}
        >
          <h2 className="text-2xl font-bold my-2 text-center text-gray-700">
            Submit Your Details
          </h2>

          {/* Title */}
          <label className="block mb-4">
            <span className="text-gray-600">Title:</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the title"
              required
            />
          </label>

          {/* Description */}
          <label className="block mb-4">
            <span className="text-gray-600">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the description"
              rows="4"
              required
            ></textarea>
          </label>

          {/* Price */}
          <label className="block mb-4">
            <span className="text-gray-600">Price:</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the price"
              required
            />
          </label>

          {/* Available Dates */}
          <label className="block mb-4">
            <span className="text-gray-600">Available Dates:</span>
            <DatePicker
              selected={formData.availableDates}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          {/* Images Section */}
          <label className="block mb-4">
            <span className="text-gray-600">Image URLs:</span>
            {formData.images.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e)}
                placeholder={`Enter Image URL ${index + 1}`}
                className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}

            <button
              type="button"
              onClick={addImageField}
              className="bg-green-500 text-white px-2 py-1 mt-2 rounded hover:bg-green-600"
            >
              Add Another Image URL
            </button>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddData;
