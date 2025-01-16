import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPurchase = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert("Congratulations! You have successfully purchased the car.");
    navigate("/"); // Redirect to the homepage
  };

  const handleCancel = () => {
    navigate("/buy-car"); // Redirect back to the car page
  };

  return (
    <div className="confirm-purchase-page min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Confirm Your Purchase</h1>
      <div className="flex flex-col items-center gap-6">
        <p className="text-lg">Are you sure you want to buy this car?</p>
        <div className="flex gap-4">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            Confirm Purchase
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchase;
