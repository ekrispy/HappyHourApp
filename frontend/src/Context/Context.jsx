import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            setAuth({ token, user: JSON.parse(localStorage.getItem("user")) });
        }
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post("http://localhost:4000/api/users/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        axios.defaults.headers.common['x-auth-token'] = data.token;
        setAuth({ token: data.token, user: data.user });
    };

    const register = async (username, email, password) => {
        const { data } = await axios.post("http://localhost:4000/api/users/signup", { username, email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        axios.defaults.headers.common['x-auth-token'] = data.token;
        setAuth({ token: data.token, user: data.user });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common['x-auth-token'];
        setAuth({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
