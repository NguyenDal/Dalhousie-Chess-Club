import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const { user } = useAuth();

    if (!user.isAuthenticated) {
        // If user is not authenticated, they're redirect to login page
        return <Navigate to="/adminLogin" />;
    }

    // Returns admin pages if they're authenticated
    return children;
};

export default AuthGuard;