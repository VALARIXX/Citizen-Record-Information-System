import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { FaHome, FaUser, FaUsers, FaFileAlt, FaSearch, FaChartBar, FaCog, FaBars, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ onMenuClick }) => {
    const { user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const navItems = {
        CITIZEN: [
            { name: 'Dashboard', path: '/citizen', icon: FaHome },
            { name: 'My Profile', path: '/citizen/profile', icon: FaUser },
            { name: 'Household', path: '/citizen/household', icon: FaUsers },
            { name: 'Certificates', path: '/citizen/certificates', icon: FaFileAlt },
        ],
        OFFICER: [
            { name: 'Dashboard', path: '/census', icon: FaHome },
            { name: 'Registry Search', path: '/census/search', icon: FaSearch },
            { name: 'Enrollment', path: '/census/enroll', icon: FaUsers },
            { name: 'Tasks', path: '/census/tasks', icon: FaChartBar },
        ],
        ADMIN: [
            { name: 'Dashboard', path: '/admin', icon: FaHome },
            { name: 'Analytics', path: '/admin/analytics', icon: FaChartBar },
            { name: 'User Management', path: '/admin/users', icon: FaUsers },
            { name: 'System Logs', path: '/admin/logs', icon: FaCog },
        ]
    };

    const currentNavItems = navItems[role] || [];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-red-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    <div className="flex px-2 lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <Logo />
                        </div>
                        <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                            {currentNavItems.map((item) => {
                                const isDashboard = item.path === '/citizen' || item.path === '/census' || item.path === '/admin';
                                const isActive = isDashboard
                                    ? location.pathname === item.path
                                    : location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
                                  ${isActive ? 'text-red-700 bg-red-50' : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'}
                                `}
                                    >
                                        <IconComponent className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="p-2 rounded-md text-gray-500 hover:text-red-700 hover:bg-red-50 focus:outline-none transition-colors text-xl"
                        >
                            <FaBars className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:ml-4 gap-4">
                        <div className="relative ml-3">
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden xl:block">
                                    <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{role?.toLowerCase()}</div>
                                </div>
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="bg-red-700 h-9 w-9 rounded-full flex items-center justify-center text-white font-bold focus:outline-none ring-2 ring-transparent hover:ring-red-200 transition-all shadow-sm"
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </button>
                            </div>

                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)}></div>
                                    <div className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-xl shadow-xl border border-red-50 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1 lg:hidden">
                                            <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">{role?.toLowerCase()}</div>
                                        </div>
                                        {role === 'CITIZEN' && (
                                            <Link to="/citizen/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                                                <FaUser size={16} /> Your Profile
                                            </Link>
                                        )}
                                        {role === 'OFFICER' && (
                                            <Link to="/census/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                                                <FaUser size={16} /> Profile Settings
                                            </Link>
                                        )}
                                        {role === 'ADMIN' && (
                                            <Link to="/admin/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                                                <FaUser size={16} /> Profile Settings
                                            </Link>
                                        )}

                                        <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                                            <FaSignOutAlt size={16} /> Sign out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden ${profileOpen ? 'block' : 'hidden'} border-t border-red-50 bg-white/95 backdrop-blur-md`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {currentNavItems.map((item) => {
                        const isDashboard = item.path === '/citizen' || item.path === '/census' || item.path === '/admin';
                        const isActive = isDashboard
                            ? location.pathname === item.path
                            : location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setProfileOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${isActive ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50 hover:text-red-700'}`}
                            >
                                <div className="flex items-center">
                                    <IconComponent className="mr-3 h-5 w-5" />
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                    <div className="border-t border-gray-100 my-2 pt-2">
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-red-700 rounded-lg transition-colors">
                            <div className="flex items-center">
                                <FaSignOutAlt className="mr-3 h-5 w-5" />
                                Sign out
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
