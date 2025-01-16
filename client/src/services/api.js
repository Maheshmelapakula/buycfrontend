import axios from "axios";

const BASE_URL = "http://localhost:5000/api/cars"; // Replace with your backend API base URL

// Fetch all cars
export const fetchAllCars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response; // Returns the complete response
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

// Delete selected cars
export const deleteCars = async (carIds) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete`, {
      data: { ids: carIds },
    });
    return response; // Returns the complete response
  } catch (error) {
    console.error("Error deleting cars:", error);
    throw error;
  }
};

// Edit car details
export const editCar = async (carId, carData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${carId}`, carData);
    return response; // Returns the complete response
  } catch (error) {
    console.error("Error editing car:", error);
    throw error;
  }
};
