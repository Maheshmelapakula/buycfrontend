import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCar = () => {
  const { carId } = useParams();  // Get carId from URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch car data for editing
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/car/${carId}`);
        setCar(response.data);
      } catch (error) {
        setError("Failed to load car data for editing.");
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/car/${carId}`, car); // Update car details
      navigate("/dashboard"); // Redirect back to the dashboard after editing
    } catch (error) {
      setError("Failed to update car. Please try again.");
      console.error("Error updating car:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={car.title}
            onChange={(e) => setCar({ ...car, title: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {/* Add more fields to edit other car details here, e.g., price, description, etc. */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCar;
