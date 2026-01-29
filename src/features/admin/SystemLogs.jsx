import React from 'react';
import Card from '../../components/Card';
import { FaExclamationCircle, FaUserCheck, FaFileAlt, FaSignInAlt, FaSignOutAlt, FaCog, FaShieldAlt } from 'react-icons/fa';

const SystemLogs = () => {
    const logs = [
        { id: 1, type: 'auth', action: 'User Login', user: 'admin@civic.id', timestamp: '2026-01-21 22:15:32', status: 'success', icon: FaSignInAlt },
        { id: 2, type: 'auth', action: 'User Logout', user: 'officer@civic.id', timestamp: '2026-01-21 21:45:10', status: 'success', icon: FaSignOutAlt },
        { id: 3, type: 'record', action: 'Citizen Record Updated', user: 'officer@civic.id', timestamp: '2026-01-21 20:30:45', status: 'success', icon: FaFileAlt },
        { id: 4, type: 'auth', action: 'Failed Login Attempt', user: 'unknown@test.com', timestamp: '2026-01-21 19:22:18', status: 'error', icon: FaExclamationCircle },
        { id: 5, type: 'admin', action: 'User Role Changed', user: 'admin@civic.id', timestamp: '2026-01-21 18:15:00', status: 'warning', icon: FaShieldAlt },
        { id: 6, type: 'record', action: 'Birth Certificate Approved', user: 'officer@civic.id', timestamp: '2026-01-21 17:45:22', status: 'success', icon: FaUserCheck },
        { id: 7, type: 'system', action: 'System Backup Completed', user: 'system', timestamp: '2026-01-21 03:00:00', status: 'success', icon: FaCog },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'error': return 'bg-red-50 text-red-700 border-red-200';
            case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getTypeStyles = (type) => {
        switch (type) {
            case 'auth': return 'bg-blue-100 text-blue-700';
            case 'record': return 'bg-purple-100 text-purple-700';
            case 'admin': return 'bg-red-100 text-red-700';
            case 'system': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
                    <p className="text-gray-500 text-sm mt-1">Monitor system activity and security events.</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-red-500 focus:border-red-500">
                        <option>All Types</option>
                        <option>Authentication</option>
                        <option>Record Changes</option>
                        <option>Admin Actions</option>
                    </select>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${getTypeStyles(log.type)}`}>
                                    <log.icon size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{log.action}</p>
                                    <p className="text-sm text-gray-500">By: {log.user}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusStyles(log.status)}`}>
                                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                                </span>
                                <span className="text-sm text-gray-400 font-mono whitespace-nowrap">{log.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default SystemLogs;
