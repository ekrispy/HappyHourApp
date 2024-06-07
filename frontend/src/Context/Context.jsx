import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            setAuth({ token, user: JSON.parse(localStorage.getItem("user")) });
        }
        }, []);
    const login = async(email, password) => {
        const { data } = await axios.post("/api/users/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        axios.defaults.headers.common['x-auth-token'] = data.token;
        setAuth({ token: data.token, user: data.user });
    };
    }