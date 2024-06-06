import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineAppstoreAdd } from 'react-icons/ai';

const Body = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
        <div className='flex items-center justify-between gap-4'></div>
      </div>
    </div>
  );
};

export default Body;
