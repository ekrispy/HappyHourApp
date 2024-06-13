import React, { useState, useContext } from 'react';
import { AiOutlineSearch, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { AuthContext } from '../../Context/Context';
import axios from 'axios';

const Body = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const { auth, setFavorites } = useContext(AuthContext); // Access auth and setFavorites from context

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle removing a favorite restaurant
  const handleRemoveFromFavorites = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:4000/api/favorites/${favoriteId}`, {
        headers: { 'x-auth-token': auth.token } // Include token in request header
      });
      // Update the favorites list
      const updatedFavorites = auth.favorites.filter(favorite => favorite._id !== favoriteId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Show alert if session is expired
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
      }
    }
  };

  return (
    <div className='bg-bodyBg h-full basis-80 p-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center border-b-2 pb-2 gap-2 basis-1/2'>
          <AiOutlineSearch className='text-hoverColor text-[20px] cursor-pointer' />
          <input
            type="text"
            placeholder='Search for your favorite'
            className='border-none outline-none placeholder:text-sm focus:outline-none'
            value={searchTerm}
            onChange={handleSearchChange} // Search input change handler
          />
        </div>
        <div className='flex gap-4 items-center'>
          <AiOutlineAppstoreAdd className='text-hoverColor text-[25px] cursor-pointer hover:text-[20px] transition-all' />
          <button className='bg-sideMenuBg cursor-pointer text-bodyBg font-semibold py-2 px-4 rounded-[5px] hover:bg-[#55545e] transition-all '>
            Time to add restaurants
          </button>
        </div>
      </div>
   
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Your Favorites</h2>
        <div className='overflow-y-auto h-96'> {/* Scrollable container */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Display favorite restaurants if available */}
            {Array.isArray(auth.favorites) && auth.favorites.length > 0 ? (
              auth.favorites.map(favorite => (
                favorite.restaurantId && (
                  <div key={favorite._id} className="border p-4 rounded shadow bg-white">
                    <h2 className="text-xl font-bold">{favorite.restaurantId.name}</h2>
                    <p className="text-sm text-gray-600">{favorite.restaurantId.address}</p>
                    <p className="text-sm">{favorite.restaurantId.cuisine}</p>
                    <p className="text-sm">{favorite.restaurantId.description}</p>
                    <p className="text-xs font-semibold text-green-600">{favorite.restaurantId.happyhour}</p>
                    <button
                      className="mt-2 p-2 bg-red-500 text-white rounded"
                      onClick={() => handleRemoveFromFavorites(favorite._id)} // Remove favorite handler
                    >
                      Remove from Favorites
                    </button>
                  </div>
                )
              ))
            ) : (
              <p className='text-center text-gray-600'>You have no favorites yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
