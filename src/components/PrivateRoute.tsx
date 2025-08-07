import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import React from "react";

const PrivateRoute: React.FC = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
