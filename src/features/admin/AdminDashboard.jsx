import React from 'react';
import { useSelector } from 'react-redux';
import { Shield, Users, Activity, Settings, BarChart3, ArrowRight, UserPlus, FileSearch } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const stats = [
        { title: 'Total Users', value: '4,291', color: 'text-indigo-700', bg: 'bg-indigo-50', icon: Users },
        { title: 'System Health', value: '99.9%', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: Activity },
        { title: 'Active Officers', value: '42', color: 'text-red-700', bg: 'bg-red-50', icon: Shield },
    ];

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 to-red-900 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-yellow-500">System Control Center</h1>
                    <p className="mt-2 text-red-100 max-w-xl">
                        Welcome, Administrator {user?.name}. You have full access to system configuration,
                        user management, and high-level analytics.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Button onClick={() => navigate('/admin/users')} className="bg-yellow-500 text-red-900 hover:bg-yellow-400">
                            <UserPlus size={18} className="mr-2" /> Manage Users
                        </Button>
                        <Button onClick={() => navigate('/admin/analytics')} variant="outline" className="text-red-900 border-red-100 hover:bg-red-50">
                            <BarChart3 size={18} className="mr-2" /> Analytics Overview
                        </Button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-0 shadow-soft">
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
                    <Card title="System Performance Summary" className="border-0 shadow-soft">
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <div className="text-center">
                                <BarChart3 size={48} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-gray-500 font-medium">Monthly Activity Trends Hub</p>
                                <button onClick={() => navigate('/admin/analytics')} className="mt-4 text-red-700 font-bold hover:underline">Open Analytics Board</button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card title="System Logs" className="border-0 shadow-soft">
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 shrink-0"></div>
                                    <div>
                                        <p className="font-medium text-gray-900">Security alert from IP 192.168.1.{i}</p>
                                        <p className="text-xs text-gray-500">{i * 5} minutes ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <Link to="/admin/logs" className="flex items-center justify-center text-sm font-medium text-red-700 hover:text-red-800">
                                View all logs <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
