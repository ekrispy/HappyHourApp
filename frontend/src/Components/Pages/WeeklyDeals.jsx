import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeeklyDeals = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/restaurants')
      .then(response => {
        console.log('Response Data:', response.data); // Debug log
        setRestaurants(response.data); // Set state with the array of restaurants
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className=" font-bold text-4xl mb-10 mt-10 flex gap-2 items-center justify-center text-center">Weekly Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(restaurants) && restaurants.map(restaurant => (
          <div key={restaurant._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <p className="text-sm text-gray-600">{restaurant.address}</p>
            <p className="text-sm">{restaurant.cuisine}</p>
            <p className="text-sm">{restaurant.description}</p>
            <p className="text-sm">{restaurant.happyhour}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyDeals;
