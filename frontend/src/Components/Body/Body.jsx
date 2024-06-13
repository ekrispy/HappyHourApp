import React, { useState, useContext } from 'react';
import { AiOutlineSearch, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { AuthContext } from '../../Context/Context';
import axios from 'axios';

const Body = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { auth, setFavorites } = useContext(AuthContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveFromFavorites = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:4000/api/favorites/${favoriteId}`, {
        headers: { 'x-auth-token': auth.token }
      });
      // Update local state to remove the favorite
      setFavorites(auth.favorites.filter(favorite => favorite._id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
        // Optionally log the user out here
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
            onChange={handleSearchChange}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <AiOutlineAppstoreAdd className='text-hoverColor text-[25px] cursor-pointer hover:text-[20px] transition-all' />
          <button className='bg-sideMenuBg cursor-pointer text-bodyBg font-semibold py-2 px-4 rounded-[5px] hover:bg-[#55545e] transition-all '>
            Time to add restaurants
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-8'>
        <div className="title">
          <h1 className='text-[35px] text-titleColor tracking-[1px font-black]'>
            Find the best place
          </h1>
          <span className='text-[16px] opacity-70'><strong> 249 restaurants,</strong> choose yours</span>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Your Favorites</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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
                    onClick={() => handleRemoveFromFavorites(favorite._id)}
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
  );
};

export default Body;
