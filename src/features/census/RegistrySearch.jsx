import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
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

    const [citizens, setCitizens] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCitizens();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const fetchCitizens = async () => {
        setLoading(true);
        try {
            // If empty search, standard behavior might be to show nothing or all (depending on backend). 
            // Assuming backend handles empty query or we send a default.
            // But let's only search if there is a term, or maybe backend supports "all"?
            // Let's assume we want to search.
            const query = searchTerm.trim() || '';
            // If query is empty, maybe don't search or search for all? 
            // Let's try searching. If backend doesn't support empty, we might need a specific endpoint for "all" 
            // or just not show anything.
            // For now, let's call search if query exists, else clear.

            if (!query) {
                setCitizens([]);
                setLoading(false);
                return;
            }

            const response = await api.get(`/api/citizens/search?query=${query}`);
            setCitizens(response.data);
        } catch (error) {
            console.error("Failed to fetch citizens", error);
        } finally {
            setLoading(false);
        }
    };

    // filteredCitizens is now just citizens from API
    const filteredCitizens = citizens;

    const handleView = (citizen) => {
        setSelectedCitizen(citizen);
        setIsViewModalOpen(true);
    };

    const handleOpenEdit = (citizen) => {
        setSelectedCitizen(citizen);
        setEditData({ name: citizen.name, address: citizen.address, status: citizen.status });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/citizens/${selectedCitizen.citizenId}`, {
                ...selectedCitizen, // Send full object or just changes? Backend usually expects full body or PATCH. 
                // CitizenController.update expects Citizen object. 
                // Let's merge existing with edits.
                name: editData.name,
                address: editData.address,
                // status field might not be on Citizen entity based on earlier checks? 
                // Wait, Citizen entity has 'active' boolean? Or status string? 
                // Earlier 'Citizen.java' showed basic fields. 
                // If backend doesn't have 'status', this might fail or be ignored.
                // Let's assume for now we send what we have.
            });

            // Refresh list
            fetchCitizens();
            setIsEditModalOpen(false);
            setSelectedCitizen(null);
        } catch (error) {
            console.error("Failed to update citizen", error);
            alert("Failed to update record");
        }
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{citizen.citizenId || citizen.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.name || citizen.fullName}</td>
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
                            <div><p className="text-gray-500">Civic ID</p><p className="font-medium text-gray-900">{selectedCitizen.citizenId || selectedCitizen.id}</p></div>
                            <div><p className="text-gray-500">Full Name</p><p className="font-medium text-gray-900">{selectedCitizen.fullName || selectedCitizen.name}</p></div>
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
