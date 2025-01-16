import React from "react";
import { useNavigate } from "react-router-dom";

const BuyCarPage = () => {
  const navigate = useNavigate();

  // Hardcoded car details
  const car = {
    title: "Tesla Model S",
    description: "Experience the ultimate electric performance car.",
    image: "https://via.placeholder.com/800x400?text=Tesla+Model+S",
    price: 79999,
    color: "Red",
    mileage: "150 miles",
  };

  const handleBuyCar = () => {
    navigate("/confirm-purchase");
  };

  return (
    <div className="buy-car-page min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={car.image}
          alt={car.title}
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="details flex flex-col gap-4">
          <p className="text-lg">{car.description}</p>
          <p>
            <strong>Price:</strong> ${car.price}
          </p>
          <p>
            <strong>Color:</strong> {car.color}
          </p>
          <p>
            <strong>Mileage:</strong> {car.mileage}
          </p>
          <button
            onClick={handleBuyCar}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCarPage;
