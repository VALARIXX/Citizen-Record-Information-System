import React from 'react';
import { useSelector } from 'react-redux';
import { FaFileAlt, FaUserCheck, FaExclamationCircle, FaArrowRight, FaClock } from 'react-icons/fa';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const CitizenDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const stats = [
        { title: 'Identity Status', value: 'Verified', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: FaUserCheck },
        { title: 'Active Certificates', value: '2 Issued', color: 'text-red-700', bg: 'bg-red-50', icon: FaFileAlt },
        { title: 'Pending Actions', value: 'None', color: 'text-gray-500', bg: 'bg-gray-100', icon: FaExclamationCircle },
    ];

    const recentActivity = [
        { id: 1, action: 'Birth Certificate Downloaded', date: '2 hours ago', icon: FaFileAlt, color: 'bg-red-50 text-red-700' },
        { id: 2, action: 'Profile Information Updated', date: '1 day ago', icon: FaUserCheck, color: 'bg-emerald-100 text-emerald-600' },
        { id: 3, action: 'Login from New Device', date: '3 days ago', icon: FaClock, color: 'bg-gray-100 text-gray-600' },
    ];

    return (
        <div className="space-y-8">

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 to-red-900 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-yellow-500">Welcome back, {user?.name}!</h1>
                    <p className="mt-2 text-red-100 max-w-xl">
                        Your CivicID dashboard gives you secure access to your government records.
                        Everything looks good with your profile today.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Button onClick={() => navigate('/citizen/profile')} variant="outline" className="text-red-900 border-red-100 hover:bg-red-50">
                            View Profile
                        </Button>
                        <Button onClick={() => navigate('/citizen/certificates')} className="bg-yellow-500 text-red-900 hover:bg-yellow-400">
                            Request Service
                        </Button>
                    </div>
                </div>

                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 right-20 -mb-20 h-40 w-40 rounded-full bg-yellow-500/20 blur-2xl"></div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-0 shadow-soft hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} strokeWidth={2} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">
                    <Card title="Civic Information" className="h-full border-0 shadow-soft">
                        <div className="space-y-6">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center text-red-700 font-bold text-2xl mr-4 shadow-sm">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
                                    <p className="text-gray-500 text-sm">Citizen ID: CID-{user?.id}-8821</p>
                                    <p className="text-gray-500 text-sm">{user?.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-red-200 transition-colors cursor-pointer group">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Voting District</p>
                                    <p className="font-medium text-gray-900 group-hover:text-red-700 transition-colors">Sholinganallur, Zone 15 (Chennai)</p>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-red-200 transition-colors cursor-pointer group">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Tax Status</p>
                                    <p className="font-medium text-gray-900 group-hover:text-red-700 transition-colors">Filing Complete (2024)</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card title="Recent Activity" className="h-full border-0 shadow-soft">
                        <div className="flow-root">
                            <ul className="-mb-8">
                                {recentActivity.map((activity, activityIdx) => (
                                    <li key={activity.id}>
                                        <div className="relative pb-8">
                                            {activityIdx !== recentActivity.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                            ) : null}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${activity.color}`}>
                                                        <activity.icon size={14} />
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                                                    </div>
                                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                        <time dateTime={activity.date}>{activity.date}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CitizenDashboard;
