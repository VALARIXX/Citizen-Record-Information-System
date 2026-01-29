import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProtectedRoute;
