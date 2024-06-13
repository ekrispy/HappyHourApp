import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/Context';

const WeeklyDeals = () => {
  const [restaurants, setRestaurants] = useState([]); // State for restaurants
  const { auth, setFavorites } = useContext(AuthContext); // Get auth and setFavorites from context

  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + '/api/alldayhh') // Fetch restaurants
      .then(response => {
        setRestaurants(response.data); // Set restaurants
      })
      .catch(error => console.error('Error fetching restaurants:', error)); // Log error
  }, []);

  const handleAddToFavorites = (restaurantId) => {
    if (!auth.token) { // Check if user is logged in
      alert('You need to be logged in to add favorites.');
      return;
    }
    axios.post(import.meta.env.VITE_BASEURL + '/api/favorites', { restaurantId }, {
      headers: { 'x-auth-token': auth.token } // Send token in headers
    })
      .then(response => {
        alert('Added to favorites');
        const restaurant = restaurants.find(r => r._id === restaurantId); // Find restaurant
        setFavorites([...auth.favorites, { ...response.data, restaurantId: restaurant }]); // Update favorites
      })
      .catch(error => {
        console.error('Error adding to favorites:', error); // Log error
        if (error.response && error.response.status === 401) {
          alert('Session expired, please log in again.');
        }
      });
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl mb-10 mt-10 flex gap-2 items-center justify-center text-center">Weekly Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(restaurants) && restaurants.map(restaurant => (
          <div key={restaurant._id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <p className="text-sm text-gray-600">{restaurant.address}</p>
            <p className="text-sm">{restaurant.cuisine}</p>
            <p className="text-sm">{restaurant.description}</p>
            <p className="text-xs font-semibold text-green-600">{restaurant.happyhour}</p>
            <button
              onClick={() => handleAddToFavorites(restaurant._id)} // Call to add to favorites
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyDeals;
