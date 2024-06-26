import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/Context';

const WeeklySpecials = () => {
  const [groupedRestaurants, setGroupedRestaurants] = useState({}); // State for grouped restaurants
  const [visibleDay, setVisibleDay] = useState(null); // State for visible day
  const { auth, setFavorites } = useContext(AuthContext); // Get auth and setFavorites from context

  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + '/api/alldayhh') // Fetch all day happy hours
      .then(response => {
        const grouped = groupByDay(response.data); // Group restaurants by day
        setGroupedRestaurants(grouped); // Set grouped restaurants
      })
      .catch(error => console.error('Error fetching restaurants:', error)); // Log error
  }, []);

  const groupByDay = (restaurants) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return restaurants.reduce((acc, restaurant) => {
      const day = days.find(d => restaurant.happyhour.includes(d)); // Find day in happy hour
      if (day) {
        if (!acc[day]) acc[day] = [];
        acc[day].push(restaurant); // Add restaurant to the day
      }
      return acc;
    }, {});
  };

  const toggleDay = (day) => {
    setVisibleDay(visibleDay === day ? null : day); // Toggle visibility of day
  };

  const handleAddToFavorites = async (restaurantId) => {
    if (!auth.token) { // Check if user is logged in
      alert('You need to be logged in to add favorites.');
      return;
    }
    try {
      const response = await axios.post(import.meta.env.VITE_BASEURL + '/api/favorites', { restaurantId }, {
        headers: { 'x-auth-token': auth.token } // Send token in headers
      });
      alert('Added to favorites');
      const restaurant = Object.values(groupedRestaurants).flat().find(r => r._id === restaurantId); // Find restaurant
      const updatedFavorites = [...auth.favorites, { ...response.data, restaurantId: restaurant }]; // Update favorites
      console.log('Adding to favorites:', updatedFavorites);
      setFavorites(updatedFavorites); // Set favorites
    } catch (error) {
      console.error('Error adding to favorites:', error); // Log error
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
      }
    }
  };

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // Days of the week

  return (
    <div className="p-2 max-w-full mx-auto mt-2">
      <h1 className="font-bold text-3xl mb-2 text-center">All Day HappyHours</h1>
      <div className="flex justify-center space-x-2 mb-4">
        {daysOfWeek.map(day => (
          <div key={day} className="border p-2 rounded bg-white shadow">
            <button
              onClick={() => toggleDay(day)} // Toggle day visibility
              className="text-lg font-bold focus:outline-none flex items-center justify-between w-full"
            >
              {day}
              <span className={`ml-2 transform ${visibleDay === day ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {visibleDay === day && groupedRestaurants[day] && (
              <div className="mt-2">
                {groupedRestaurants[day].map(restaurant => (
                  <div key={restaurant._id} className="border p-2 rounded mb-2 shadow-sm bg-gray-50">
                    <h2 className="text-base font-bold mb-1">{restaurant.name}</h2>
                    <p className="text-xs text-gray-600 mb-1">{restaurant.address}</p>
                    <p className="text-xs mb-1">{restaurant.cuisine}</p>
                    <p className="text-xs mb-1">{restaurant.description}</p>
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySpecials;
