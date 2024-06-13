import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null, favorites: [] }); // State for auth data

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const token = localStorage.getItem("token"); // Load token from localStorage
        const user = localStorage.getItem("user"); // Load user from localStorage
        const favorites = localStorage.getItem("favorites"); // Load favorites from localStorage

        if (token) {
          axios.defaults.headers.common['x-auth-token'] = token; // Set default auth header
        }

        const loadedAuth = {
          token: token || null,
          user: user ? JSON.parse(user) : null,
          favorites: favorites ? JSON.parse(favorites) : [],
        };

        setAuth(loadedAuth); // Set auth state
        console.log('Auth data loaded:', loadedAuth);
      } catch (error) {
        console.error("Error loading auth data from localStorage", error);
        setAuth({ token: null, user: null, favorites: [] }); // Reset auth state on error
      }
    };

    loadAuthData(); // Load auth data on component mount
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_BASEURL + "/api/users/login", { email, password });
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
      const favoritesResponse = await axios.get(import.meta.env.VITE_BASEURL + "/api/favorites", {
        headers: { 'x-auth-token': data.token }
      });
      const favorites = favoritesResponse.data.map(fav => ({ ...fav, restaurantId: fav.restaurantId }));
      localStorage.setItem("favorites", JSON.stringify(favorites)); // Store favorites in localStorage
      axios.defaults.headers.common['x-auth-token'] = data.token; // Set default auth header
      setAuth({ token: data.token, user: data.user, favorites: favorites }); // Set auth state
      console.log('Login successful:', { token: data.token, user: data.user, favorites });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_BASEURL + "/api/users/register", { username, email, password });
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
      localStorage.setItem("favorites", JSON.stringify([])); // Initialize favorites in localStorage
      axios.defaults.headers.common['x-auth-token'] = data.token; // Set default auth header
      setAuth({ token: data.token, user: data.user, favorites: [] }); // Set auth state
      console.log('Register successful:', { token: data.token, user: data.user });
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user from localStorage
    localStorage.removeItem("favorites"); // Remove favorites from localStorage
    delete axios.defaults.headers.common['x-auth-token']; // Remove default auth header
    setAuth({ token: null, user: null, favorites: [] }); // Reset auth state
    console.log('Logout successful');
  };

  const setFavorites = (favorites) => {
    console.log('Setting favorites:', favorites);
    setAuth(prevAuth => ({ ...prevAuth, favorites })); // Update favorites in auth state
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Store favorites in localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, setFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
