import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {name: "", isAuthenticated: false};
    });

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = async (userName, password) => {
        try {
            const response = await fetch('http://localhost:5001/api/login');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const adminUser = data[0];

            if (adminUser.username === userName && adminUser.password === password) {
                setUser({name: userName, isAuthenticated: true});
                return Promise.resolve("success");
            } else {
                return Promise.reject("Incorrect username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject("Login failed due to server error");
        }
    };

    const logout = () => {
        setUser({name: "", isAuthenticated: false});
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
