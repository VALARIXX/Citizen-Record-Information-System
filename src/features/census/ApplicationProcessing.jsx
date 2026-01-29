import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { FaCheckCircle, FaTimesCircle, FaFileAlt, FaClock, FaEye } from 'react-icons/fa';

const ApplicationProcessing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const [applications, setApplications] = useState([
        { id: 'APP-TN-001', applicant: 'Ram Kumar', type: 'Birth Certificate', date: '2023-11-20', status: 'Pending' },
        { id: 'APP-TN-002', applicant: 'Sivakumar', type: 'Address Update', date: '2023-11-19', status: 'Verified' },
        { id: 'APP-TN-003', applicant: 'Lakshmi', type: 'Death Certificate', date: '2023-11-18', status: 'Rejected' },
        { id: 'APP-TN-004', applicant: 'Meera', type: 'Income Certificate', date: '2023-11-17', status: 'Pending' },
    ]);

    const handleViewDetails = (app) => {
        setSelectedApp(app);
        setIsModalOpen(true);
    };

    const handleApprove = () => {
        setApplications(applications.map(app =>
            app.id === selectedApp.id ? { ...app, status: 'Verified' } : app
        ));
        setIsModalOpen(false);
        setSelectedApp(null);
    };

    const handleReject = () => {
        setApplications(applications.map(app =>
            app.id === selectedApp.id ? { ...app, status: 'Rejected' } : app
        ));
        setIsModalOpen(false);
        setSelectedApp(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Verified': return 'text-green-600';
            case 'Rejected': return 'text-red-600';
            default: return 'text-yellow-600';
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Application Processing</h1>

            <div className="grid gap-4">
                {applications.map((app) => (
                    <Card key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-4">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <FaFileAlt className="text-blue-500 mr-2" size={20} />
                                <h3 className="text-lg font-medium text-gray-900">{app.type}</h3>
                                <span className="ml-3 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                    {app.id}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">Applicant: <span className="font-semibold">{app.applicant}</span></p>
                            <p className="text-sm text-gray-500">Submitted: {app.date}</p>
                        </div>

                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className={`flex items-center text-sm font-medium ${getStatusColor(app.status)}`}>
                                {app.status === 'Pending' && <FaClock size={14} className="mr-1" />}
                                {app.status === 'Verified' && <FaCheckCircle size={14} className="mr-1" />}
                                {app.status === 'Rejected' && <FaTimesCircle size={14} className="mr-1" />}
                                {app.status}
                            </div>

                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleViewDetails(app)}
                            >
                                <FaEye size={16} className="mr-1" /> View Details
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Application Details">
                {selectedApp && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><p className="text-gray-500">Applicant Name</p><p className="font-medium text-gray-900">{selectedApp.applicant}</p></div>
                            <div><p className="text-gray-500">Application ID</p><p className="font-medium text-gray-900">{selectedApp.id}</p></div>
                            <div><p className="text-gray-500">Service Type</p><p className="font-medium text-gray-900">{selectedApp.type}</p></div>
                            <div><p className="text-gray-500">Submission Date</p><p className="font-medium text-gray-900">{selectedApp.date}</p></div>
                            <div><p className="text-gray-500">Current Status</p>
                                <span className={`font-semibold ${getStatusColor(selectedApp.status)}`}>{selectedApp.status}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm text-gray-600">
                            <p className="mb-1 font-semibold">Attached Documents:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Proof of Identity (Verified)</li>
                                <li>Proof of Address (Pending)</li>
                                <li>Supporting Documents (Available)</li>
                            </ul>
                        </div>

                        {selectedApp.status === 'Pending' && (
                            <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                                <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white">
                                    <FaTimesCircle size={16} className="mr-1" /> Reject
                                </Button>
                                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white">
                                    <FaCheckCircle size={16} className="mr-1" /> Approve
                                </Button>
                            </div>
                        )}

                        {selectedApp.status !== 'Pending' && (
                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ApplicationProcessing;
