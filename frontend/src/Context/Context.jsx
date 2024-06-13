import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null, favorites: [] });

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const favorites = localStorage.getItem("favorites");

        if (token) {
          axios.defaults.headers.common['x-auth-token'] = token;
        }

        setAuth({
          token: token || null,
          user: user ? JSON.parse(user) : null,
          favorites: favorites ? JSON.parse(favorites) : [],
        });
      } catch (error) {
        console.error("Error loading auth data from localStorage", error);
        setAuth({ token: null, user: null, favorites: [] });
      }
    };

    loadAuthData();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const favoritesResponse = await axios.get("http://localhost:4000/api/favorites", {
        headers: { 'x-auth-token': data.token }
      });
      const favorites = favoritesResponse.data.map(fav => ({ ...fav, restaurantId: fav.restaurantId }));
      localStorage.setItem("favorites", JSON.stringify(favorites));
      axios.defaults.headers.common['x-auth-token'] = data.token;
      setAuth({ token: data.token, user: data.user, favorites: favorites });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/users/signup", { username, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("favorites", JSON.stringify([]));
      axios.defaults.headers.common['x-auth-token'] = data.token;
      setAuth({ token: data.token, user: data.user, favorites: [] });
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    delete axios.defaults.headers.common['x-auth-token'];
    setAuth({ token: null, user: null, favorites: [] });
  };

  const setFavorites = (favorites) => {
    setAuth(prevAuth => ({ ...prevAuth, favorites }));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, setFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
