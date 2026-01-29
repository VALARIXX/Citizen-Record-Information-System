import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { calculateAge } from '../../utils/calculateAge';

const RegistrySearch = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCitizen, setSelectedCitizen] = useState(null);
    const [editData, setEditData] = useState({ name: '', address: '', status: '' });

    const [citizens, setCitizens] = useState([
        { id: 'CID-TN-1001', name: 'Arjun', address: '45 Anna Salai, Chennai', status: 'Active', dob: '1990-05-15', gender: 'Male', phone: '+91 9876543210' },
        { id: 'CID-TN-1002', name: 'Priya', address: '12 RS Puram, Coimbatore', status: 'Moved', dob: '1992-11-22', gender: 'Female', phone: '+91 8765432109' },
        { id: 'CID-TN-1003', name: 'Karthik', address: '78 KK Nagar, Madurai', status: 'Deceased', dob: '1950-02-10', gender: 'Male', phone: '+91 7654321098' },
        { id: 'CID-TN-1004', name: 'Kavya', address: '32 Thillai Nagar, Trichy', status: 'Active', dob: '1998-08-30', gender: 'Female', phone: '+91 6543210987' },
    ]);

    const filteredCitizens = citizens.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = (citizen) => {
        setSelectedCitizen(citizen);
        setIsViewModalOpen(true);
    };

    const handleOpenEdit = (citizen) => {
        setSelectedCitizen(citizen);
        setEditData({ name: citizen.name, address: citizen.address, status: citizen.status });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setCitizens(citizens.map(c =>
            c.id === selectedCitizen.id
                ? { ...c, name: editData.name, address: editData.address, status: editData.status }
                : c
        ));
        setIsEditModalOpen(false);
        setSelectedCitizen(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Citizen Registry</h1>
                <Button onClick={() => navigate('/census/enroll')}>
                    <FaPlus size={18} className="mr-2" /> Add Record
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder=""
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <FaFilter className="h-4 w-4" /> Filter
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Civic ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCitizens.map((citizen) => (
                            <tr key={citizen.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{citizen.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${citizen.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            citizen.status === 'Moved' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {citizen.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleView(citizen)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="View Profile">
                                        <FaEye size={18} />
                                    </button>
                                    <button onClick={() => handleOpenEdit(citizen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Record">
                                        <FaEdit size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Citizen Details">
                {selectedCitizen && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><p className="text-gray-500">Civic ID</p><p className="font-medium text-gray-900">{selectedCitizen.id}</p></div>
                            <div><p className="text-gray-500">Full Name</p><p className="font-medium text-gray-900">{selectedCitizen.name}</p></div>
                            <div><p className="text-gray-500">Date of Birth</p><p className="font-medium text-gray-900">{selectedCitizen.dob}</p></div>
                            <div><p className="text-gray-500">Age</p><p className="font-medium text-red-700">{calculateAge(selectedCitizen.dob)} years</p></div>
                            <div><p className="text-gray-500">Gender</p><p className="font-medium text-gray-900">{selectedCitizen.gender}</p></div>
                            <div className="col-span-2"><p className="text-gray-500">Address</p><p className="font-medium text-gray-900">{selectedCitizen.address}</p></div>
                            <div><p className="text-gray-500">Phone</p><p className="font-medium text-gray-900">{selectedCitizen.phone}</p></div>
                            <div><p className="text-gray-500">Status</p>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${selectedCitizen.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {selectedCitizen.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t">
                            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Citizen Record">
                <form onSubmit={handleSaveEdit} className="space-y-4">
                    <Input label="Full Name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
                    <Input label="Address" value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={editData.status}
                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Moved">Moved</option>
                            <option value="Deceased">Deceased</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default RegistrySearch;
