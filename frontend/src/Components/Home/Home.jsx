import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import Carousel from '../Carousel/Carousel.jsx'; // Import the Carousel component

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const happyHourImages = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x200',
      title: 'Happy Hour 1',
      location: '123 Main St, Anytown, USA',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x200',
      title: 'Happy Hour 2',
      location: '456 Elm St, Othertown, USA',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x200',
      title: 'Happy Hour 3',
      location: '789 Oak St, Thistown, USA',
    },
    // Add more images here
  ];

  return (
    <div className="h-screen">
      <NavBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <div className="p-4">
        <h1 className="text-3xl mb-4">Welcome to HappyHour!</h1>
        <p className="text-xl mb-10 mt-10 flex gap-2 items-center justify-center text-center">Featured Happy Hour Deals</p>
        <Carousel images={happyHourImages} /> {/* Use the Carousel component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card 
            title="Weekly Happy Hour Deals" 
            description="Check out the best deals of the week!" 
            link="/weekly-deals" 
          />
          <Card 
            title="New Happy Hours" 
            description="Discover the newest happy hours in town!" 
            link="/new-happy-hours" 
          />
          <Card 
            title="Late Night Happy Hours" 
            description="Find late night happy hour specials!" 
            link="/late-night-deals" 
          />
          <Card 
            title="Weekly Specials" 
            description="Explore this week's special offers!" 
            link="/weekly-specials" 
          />
        </div>
      </div>
    </div>
  );
};

const NavBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <nav className="bg-sideMenuBg text-white p-4 flex justify-between items-center w-full fixed top-0 left-0">
      <div className="text-2xl font-bold">
        <Link to="/">HappyHour</Link>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search for happy hours"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />
        <AiOutlineSearch className="text-[20px] cursor-pointer ml-2" />
        <Link to="/login" className="hover:text-hoverColor">Login</Link>
        <Link to="/signup" className="hover:text-hoverColor">Sign Up</Link>
      </div>
    </nav>
  );
};

const Card = ({ title, description, link }) => {
  return (
    <div className="border rounded shadow p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <Link to={link} className="text-blue-500 hover:text-blue-700">Learn More</Link>
    </div>
  );
};

export default Home;
