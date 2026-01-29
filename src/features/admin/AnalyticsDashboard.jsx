import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import Card from '../../components/Card';
import { FaChartLine, FaUsers, FaHome, FaActivity, FaArrowUp } from 'react-icons/fa';

const AnalyticsDashboard = () => {
    const populationData = [
        { name: 'North', citizens: 4000, growth: 2400 },
        { name: 'South', citizens: 3000, growth: 1398 },
        { name: 'East', citizens: 2000, growth: 9800 },
        { name: 'West', citizens: 2780, growth: 3908 },
    ];

    const genderData = [
        { name: 'Male', value: 400 },
        { name: 'Female', value: 300 },
        { name: 'Other', value: 50 },
    ];

    const COLORS = ['#b91c1c', '#10b981', '#f59e0b', '#ef4444'];

    const stats = [
        { title: 'Total Enrollments', value: '12,482', change: '+12%', icon: FaUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Active Residents', value: '11,205', change: '+5%', icon: FaHome, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'System Activity', value: '98.2%', change: '+0.5%', icon: FaActivity, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Growth Rate', value: '3.4%', change: '+1.2%', icon: FaChartLine, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-0 shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                                        <FaArrowUp size={12} className="mr-1" /> {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <Card title="Regional Population Trends" className="border-0 shadow-soft min-h-[400px]">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={populationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCitizens" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#b91c1c" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="citizens" stroke="#b91c1c" strokeWidth={3} fillOpacity={1} fill="url(#colorCitizens)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Demographic Distribution" className="border-0 shadow-soft min-h-[400px]">
                    <div className="h-80 flex justify-center items-center mt-4 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <span className="text-3xl font-bold text-gray-800">750</span>
                            <span className="text-xs text-gray-400 font-medium uppercase">Total Sample</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
