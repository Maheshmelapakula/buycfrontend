import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCar = () => {
  const [carData, setCarData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    color: "",
    mileage: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("http://localhost:5000/api/car/add", carData);
      setSuccess(true);
      setCarData({
        title: "",
        image: "",
        description: "",
        price: "",
        color: "",
        mileage: "",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Error adding car. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Car</h1>
        
        {success && (
          <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">
            Car added successfully!
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block">Car Title</label>
            <input
              type="text"
              name="title"
              value={carData.title}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block">Image URL</label>
            <input
              type="text"
              name="image"
              value={carData.image}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block">Description</label>
            <textarea
              name="description"
              value={carData.description}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            ></textarea>
          </div>
          <div className="col-span-1">
            <label className="block">Price</label>
            <input
              type="number"
              name="price"
              value={carData.price}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block">Color</label>
            <input
              type="text"
              name="color"
              value={carData.color}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block">Mileage</label>
            <input
              type="number"
              name="mileage"
              value={carData.mileage}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded col-span-1 sm:col-span-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
