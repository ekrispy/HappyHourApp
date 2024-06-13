import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Get token from local storage

  return token ? <Outlet /> : <Navigate to="/login" />; // Check token and render accordingly
};

export default PrivateRoute;
