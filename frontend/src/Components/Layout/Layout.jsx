import React from 'react';
import { Outlet } from 'react-router-dom'; 
import NavBar from '../NavBar/NavBar'; 

const Layout = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <NavBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} /> {/* Render NavBar */}
      <div className="mt-16"> {/* Add margin to avoid overlap with fixed NavBar */}
        <Outlet /> {/* Render child routes */}
      </div>
    </div>
  );
};

export default Layout;
