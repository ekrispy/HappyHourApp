import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../../Context/Context';

const NavBar = ({ searchTerm, handleSearchChange }) => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <nav className="bg-sideMenuBg text-white p-4 flex justify-between items-center w-full fixed top-0 left-0 z-10">
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
        {auth.user ? (
          <>
            <span>Hi, {auth.user.username}</span>
            <Link to="/home" className="hover:text-hoverColor">User Page</Link>
            <button onClick={handleLogout} className="hover:text-hoverColor">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-hoverColor">Login</Link>
            <Link to="/signup" className="hover:text-hoverColor">Sign Up</Link>
          </>
        )}
        <Link to="/" className="hover:text-hoverColor">Home</Link>
      </div>
    </nav>
  );
};

export default NavBar;
