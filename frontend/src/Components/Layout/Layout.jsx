import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'; // Import the NavBar component

const Layout = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <NavBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <div className="mt-16"> {/* Add margin to avoid overlap with fixed NavBar */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;