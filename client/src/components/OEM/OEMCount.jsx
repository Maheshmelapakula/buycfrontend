// src/components/OEMCount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OEMCount = () => {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOEMCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/oem/count'); // Adjust the endpoint as per your backend
        setCount(response.data.count);
      } catch (error) {
        setError('Error fetching OEM count');
        console.error(error);
      }
    };

    fetchOEMCount();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">OEM Count</h2>
      {error && (
        <p className="text-red-500 text-center font-medium mb-4">{error}</p>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {count !== null ? (
          <p className="text-xl text-center text-gray-800">
            Available OEM Models: <span className="font-semibold">{count}</span>
          </p>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default OEMCount;
