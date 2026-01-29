import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardLayout = () => {
    const location = useLocation();

    const getBreadcrumbs = () => {
        const path = location.pathname.split('/').filter(Boolean);
        return path.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
    };

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

export default DashboardLayout;
