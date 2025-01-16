import React, { useState, useEffect } from "react";

const DealerDashboard = ({ userRole }) => {
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    description: "",
  });
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    if (userRole !== "Dealer") {
      alert("Access denied! Only Dealers can access this dashboard.");
      // Redirect or handle access restriction
      window.location.href = "/unauthorized"; // Change this URL as needed
    }
  }, [userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { brand, model, year, mileage, price } = carDetails;

    if (!brand || !model || !year || !mileage || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    setCarList((prev) => [...prev, carDetails]);
    setCarDetails({
      brand: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      description: "",
    });
    alert("Car details added successfully!");
  };

  if (userRole !== "Dealer") return null; // Prevent rendering if not a Dealer

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Dealer Dashboard
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add Second-Hand Car Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={carDetails.brand}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="e.g., Toyota"
                required
              />
            </div>
            {/* Model */}
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={carDetails.model}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="e.g., Corolla"
                required
              />
            </div>
            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={carDetails.year}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="e.g., 2015"
                required
              />
            </div>
            {/* Mileage */}
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                Mileage (in km)
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={carDetails.mileage}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="e.g., 45000"
                required
              />
            </div>
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (in $)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={carDetails.price}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="e.g., 15000"
                required
              />
            </div>
          </div>
          {/* Description */}
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={carDetails.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Additional details about the car"
              rows="3"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition mt-4"
          >
            Add Car
          </button>
        </form>
      </div>

      {/* List of Cars */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Car Listings</h2>
        {carList.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {carList.map((car, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <h3 className="text-lg font-bold text-gray-700">
                  {car.brand} {car.model}
                </h3>
                <p className="text-sm text-gray-600">Year: {car.year}</p>
                <p className="text-sm text-gray-600">Mileage: {car.mileage} km</p>
                <p className="text-sm text-gray-600">Price: ${car.price}</p>
                {car.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {car.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No cars added yet.</p>
        )}
      </div>
    </div>
  );
};

export default DealerDashboard;
