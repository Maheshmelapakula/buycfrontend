import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    color: "",
    mileage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch car data from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/car");
        setCars(response.data);
      } catch (error) {
        setError("Failed to load car data. Please try again.");
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Check for login token and user role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role); // Assuming role is in the token
    }
  }, [navigate]);

  // Filter logic
  const filteredCars = cars.filter((car) => {
    const matchesPrice = !filters.price || car.price <= Number(filters.price);
    const matchesColor =
      !filters.color || car.color.toLowerCase() === filters.color.toLowerCase();
    const matchesMileage =
      !filters.mileage || car.mileage <= Number(filters.mileage);
    return matchesPrice && matchesColor && matchesMileage;
  });

  // Filter input handlers
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setFilters({ ...filters, price: value });
    }
  };

  const handleMileageChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setFilters({ ...filters, mileage: value });
    }
  };

  const handleColorChange = (e) => {
    setFilters({ ...filters, color: e.target.value });
  };

  // Delete car handler
  const deleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/car/${carId}`);
      setCars(cars.filter((car) => car.id !== carId));
    } catch (error) {
      setError("Failed to delete the car. Please try again.");
      console.error("Error deleting car:", error);
    }
  };

  // Edit car handler
  const editCar = (carId) => {
    navigate(`/edit-car/${carId}`);
  };

  // Buy car handler
  const buyCar = (carId) => {
    navigate(`/buy-car/${carId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Customer Dashboard</h1>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Filter Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Price</label>
            <input
              type="number"
              value={filters.price}
              onChange={handlePriceChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter max price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              value={filters.color}
              onChange={handleColorChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter color"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Mileage</label>
            <input
              type="number"
              value={filters.mileage}
              onChange={handleMileageChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter max mileage"
            />
          </div>
        </div>
      </div>

      {/* Add Car Button for Dealer */}
      {userRole === "dealer" && (
        <div className="mb-6">
          <button
            onClick={() => navigate("/add-car")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Car
          </button>
        </div>
      )}

      {/* OEM Buttons */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/oem-add")}
          className="bg-green-500 text-white px-4 py-2 rounded mr-4"
        >
          Add OEM
        </button>
        <button
          onClick={() => navigate("/oem-count")}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
        >
          OEM Count
        </button>
        <button
          onClick={() => navigate("/oem-search")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Search OEM
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCars.map((car) => (
            <div key={car.id} className="border rounded shadow p-4 relative">
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold">{car.title}</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {(Array.isArray(car.description) ? car.description : [car.description]).map(
                  (point, index) => (
                    <li key={index}>{point}</li>
                  )
                )}
              </ul>
              <div className="mt-4">
                <p><strong>Price:</strong> ${car.price}</p>
                <p><strong>Mileage:</strong> {car.mileage} miles</p>
                <p><strong>Color:</strong> {car.color}</p>
              </div>

              {userRole === "dealer" && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => editCar(car.id)}
                    className="bg-green-500 text-white text-sm p-1 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="bg-red-500 text-white text-sm p-1 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              )}

              {userRole === "customer" && (
                <div className="mt-4">
                  <button
                    onClick={() => buyCar(car.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
