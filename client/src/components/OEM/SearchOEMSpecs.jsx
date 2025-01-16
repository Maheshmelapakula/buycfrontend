import React, { useState } from 'react';
import axios from 'axios';

const SearchOEMSpecs = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [oemSpecs, setOemSpecs] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/oem/search', {
        params: { name, year },
      });
      setOemSpecs(response.data.oemSpecs);
      setError('');
    } catch (error) {
      setError('Error fetching OEM specs');
      setOemSpecs(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Search OEM Specs</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Search
        </button>
      </div>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {oemSpecs && (
        <div className="mt-6 p-4 border rounded-md bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-2">OEM Specs</h3>
          <p className="text-lg">Name: <span className="font-medium">{oemSpecs.name}</span></p>
          <p className="text-lg">Manufacturer: <span className="font-medium">{oemSpecs.manufacturer}</span></p>
          <p className="text-lg">Year: <span className="font-medium">{oemSpecs.year}</span></p>
          <p className="text-lg">Model Number: <span className="font-medium">{oemSpecs.modelNumber}</span></p>
          <p className="text-lg">Available: <span className="font-medium">{oemSpecs.available ? 'Yes' : 'No'}</span></p>
          
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Specs</h4>
            <p>Engine: <span className="font-medium">{oemSpecs.specs.engine}</span></p>
            <p>Transmission: <span className="font-medium">{oemSpecs.specs.transmission}</span></p>
            <p>Fuel Type: <span className="font-medium">{oemSpecs.specs.fuelType}</span></p>
            <p>Mileage: <span className="font-medium">{oemSpecs.specs.mileage}</span></p>
            <p>Seating Capacity: <span className="font-medium">{oemSpecs.specs.seatingCapacity}</span></p>
            <p>Color Options: <span className="font-medium">{oemSpecs.specs.colorOptions.join(', ')}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOEMSpecs;
