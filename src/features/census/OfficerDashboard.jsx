import React from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaFileAlt, FaCheckCircle, FaClock, FaSearch, FaArrowRight } from 'react-icons/fa';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const OfficerDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const stats = [
        { title: 'Total Citizens', value: '1,284', color: 'text-blue-700', bg: 'bg-blue-50', icon: FaUsers },
        { title: 'Pending Tasks', value: '12', color: 'text-red-700', bg: 'bg-red-50', icon: FaClock },
        { title: 'Processed Today', value: '8', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: FaCheckCircle },
    ];

    const upcomingTasks = [
        { id: 1, type: 'Birth Certificate', citizen: 'Ram Kumar', status: 'Verification Pending', time: '1 hr ago' },
        { id: 2, type: 'Death Certificate', citizen: 'Lakshmi', status: 'Ready for Review', time: '3 hrs ago' },
        { id: 3, type: 'Marriage Certificate', citizen: 'Sivakumar', status: 'In Progress', time: '5 hrs ago' },
    ];

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 to-red-900 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-yellow-500">Welcome, Officer {user?.name}</h1>
                    <p className="mt-2 text-red-100 max-w-xl">
                        Management of the citizen registry and service requests.
                        You have {stats[1].value} tasks requiring your attention today.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Button onClick={() => navigate('/census/search')} className="bg-yellow-500 text-red-900 hover:bg-yellow-400">
                            <FaSearch size={18} className="mr-2" /> Search Registry
                        </Button>
                        <Button onClick={() => navigate('/census/enroll')} variant="outline" className="text-red-900 border-red-100 hover:bg-red-50">
                            New Enrollment
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
                    <Card title="Recent Registry Updates" className="border-0 shadow-soft">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4">
                                            {i}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Record #{1000 + i} Updated</h4>
                                            <p className="text-xs text-gray-500">Updated by System • 2 hours ago</p>
                                        </div>
                                    </div>
                                    <Link to="/census/search" className="text-red-700 hover:text-red-800 text-sm font-medium">View Details</Link>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card title="Pending Approvals" className="border-0 shadow-soft">
                        <div className="space-y-4">
                            {upcomingTasks.map((task) => (
                                <div key={task.id} className="pb-4 border-b border-gray-100 last:border-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{task.type}</p>
                                            <p className="text-xs text-gray-500">{task.citizen}</p>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">{task.time}</span>
                                    </div>
                                    <p className="mt-1 text-xs text-red-700 font-medium">{task.status}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Link to="/census/tasks" className="flex items-center justify-center text-sm font-medium text-red-700 hover:text-red-800">
                                Handle tasks <FaArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OfficerDashboard;
