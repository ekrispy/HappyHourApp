import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-sideMenuBg text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">HappyHour</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="hover:text-hoverColor">Login</Link>
        <Link to="/signup" className="hover:text-hoverColor">Sign Up</Link>
      </div>
    </nav>
  );
};

export default NavBar;
