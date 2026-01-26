import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        
        if (role === 'ADMIN') return <Navigate to="/admin" replace />;
        if (role === 'OFFICER') return <Navigate to="/census" replace />;
        return <Navigate to="/citizen" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
