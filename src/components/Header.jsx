import React, { useState } from 'react';
import { Menu, Bell, Search, ChevronDown, User, LogOut, Settings, Home, Users, FileText, Activity } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = ({ onMenuClick }) => {
    const { user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const navItems = {
        CITIZEN: [
            { name: 'Dashboard', path: '/citizen', icon: Home },
            { name: 'My Profile', path: '/citizen/profile', icon: User },
            { name: 'Household', path: '/citizen/household', icon: Users },
            { name: 'Certificates', path: '/citizen/certificates', icon: FileText },
        ],
        OFFICER: [
            { name: 'Dashboard', path: '/census', icon: Home },
            { name: 'Registry Search', path: '/census/search', icon: Search },
            { name: 'Enrollment', path: '/census/enroll', icon: Users },
            { name: 'Tasks', path: '/census/tasks', icon: Activity },
        ],
        ADMIN: [
            { name: 'Dashboard', path: '/admin', icon: Home },
            { name: 'Analytics', path: '/admin/analytics', icon: Activity },
            { name: 'User Management', path: '/admin/users', icon: Users },
            { name: 'System Logs', path: '/admin/logs', icon: Settings },
        ]
    };

    const currentNavItems = navItems[role] || [];

    const notifications = [
        { id: 1, text: 'Birth Certificate Approved', time: '2 hrs ago', unread: true },
        { id: 2, text: 'New Login Detected', time: '1 day ago', unread: false },
        { id: 3, text: 'Profile Update Success', time: '2 days ago', unread: false },
    ];

    return (
        <header className="sticky top-0 z-30 bg-red-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    <div className="flex px-2 lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="bg-yellow-500 p-1.5 rounded text-red-900 shadow-sm">
                                    <div className="font-bold text-xl leading-none">C</div>
                                </div>
                                <span className="hidden md:block font-bold text-xl tracking-tight text-white">CivicID</span>
                            </Link>
                        </div>
                        <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                            {currentNavItems.map((item) => {

                                const isDashboard = item.path === '/citizen' || item.path === '/census' || item.path === '/admin';
                                const isActive = isDashboard
                                    ? location.pathname === item.path
                                    : location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                                  ${isActive ? 'bg-red-900 text-white shadow-inner' : 'text-red-100 hover:bg-red-700 hover:text-white'}
                                `}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center lg:hidden">

                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="p-2 rounded-md text-red-200 hover:text-white hover:bg-red-700 focus:outline-none"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:ml-4 gap-4">



                        <div className="relative">
                            <button
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="bg-red-800 p-1 rounded-full text-red-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-white"
                            >
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-yellow-400 ring-2 ring-red-800"></span>
                            </button>
                            {notificationsOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)}></div>
                                    <div className="absolute right-0 z-20 w-80 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">Notifications</p>
                                        </div>
                                        {notifications.map((n) => (
                                            <div key={n.id} className="px-4 py-3 border-b border-gray-50 text-sm text-gray-700 hover:bg-gray-50">
                                                {n.text}
                                                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="relative ml-3">
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden xl:block">
                                    <div className="text-sm font-medium text-white">{user?.name}</div>
                                    <div className="text-xs text-red-200 capitalize">{role?.toLowerCase()}</div>
                                </div>
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="bg-yellow-500 h-8 w-8 rounded-full flex items-center justify-center text-red-900 font-bold focus:outline-none ring-2 ring-transparent hover:ring-white transition-all"
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </button>
                            </div>

                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)}></div>
                                    <div className="absolute right-0 z-20 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                        {role === 'CITIZEN' && (
                                            <Link to="/citizen/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                                        )}
                                        {role === 'OFFICER' && (
                                            <Link to="/census/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</Link>
                                        )}
                                        {role === 'ADMIN' && (
                                            <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</Link>
                                        )}

                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden ${profileOpen ? 'block' : 'hidden'} border-t border-red-700 bg-red-800`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {currentNavItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setProfileOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-red-900 text-white' : 'text-red-100 hover:bg-red-700 hover:text-white'}`}
                            >
                                <div className="flex items-center">
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                    <div className="border-t border-red-700 my-2 pt-2">
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-100 hover:bg-red-700 hover:text-white">
                            <div className="flex items-center">
                                <LogOut className="mr-3 h-5 w-5" />
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
