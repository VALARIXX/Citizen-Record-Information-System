import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Card from '../../components/Card';
import { FaChartLine, FaUsers, FaHome, FaArrowUp, FaFileExcel, FaFilePdf, FaFilter, FaDownload } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';

const AnalyticsDashboard = () => {
    const [selectedRegion, setSelectedRegion] = useState('All Regions');

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

    const ageData = [
        { range: '0-14', count: 1250 },
        { range: '15-24', count: 2100 },
        { range: '25-54', count: 4500 },
        { range: '55-64', count: 1800 },
        { range: '65+', count: 1200 },
    ];

    const growthTrendData = [
        { month: 'Jan', value: 400 },
        { month: 'Feb', value: 600 },
        { month: 'Mar', value: 800 },
        { month: 'Apr', value: 700 },
        { month: 'May', value: 1100 },
        { month: 'Jun', value: 1590 },
    ];

    const COLORS = ['#b91c1c', '#10b981', '#f59e0b', '#ef4444'];
    const regions = ['All Regions', 'North', 'South', 'East', 'West'];

    const stats = [
        { title: 'Total Enrollments', value: '12,482', change: '+12%', icon: FaUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Active Residents', value: '11,205', change: '+5%', icon: FaHome, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'System Activity', value: '98.2%', change: '+0.5%', icon: FiActivity, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Growth Rate', value: '3.4%', change: '+1.2%', icon: FaChartLine, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics & Statistics</h1>
                    <p className="text-gray-500">Comprehensive population insights and demographic data</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <FaFileExcel className="text-emerald-600" />
                        Export Excel
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <FaFilePdf className="text-red-600" />
                        Export PDF
                    </button>
                </div>
            </div>

            
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-soft flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 mr-2">
                    <FaFilter size={14} />
                    <span className="text-sm font-medium">Filters:</span>
                </div>
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 outline-none"
                >
                    {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-0 shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                                        <FaArrowUp size={10} className="mr-1" /> {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
                <Card title="Regional Population Trends" className="border-0 shadow-soft min-h-[400px]">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={populationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="citizens" fill="#b91c1c" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

              
                <Card title="Gender Distribution" className="border-0 shadow-soft min-h-[400px]">
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
                            <span className="text-xs text-gray-400 font-medium uppercase">Total Population</span>
                        </div>
                    </div>
                </Card>

               
                <Card title="Age Group Distribution" className="border-0 shadow-soft min-h-[400px]">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis type="category" dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

               
                <Card title="Population Growth Trend" className="border-0 shadow-soft min-h-[400px]">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={growthTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#b91c1c" strokeWidth={3} dot={{ r: 4, fill: '#b91c1c', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
