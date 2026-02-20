import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { FaUser, FaTrash, FaEdit, FaShieldAlt, FaPlus, FaLock, FaSpinner } from 'react-icons/fa';
import { fetchUsers, createUser, updateUser, deleteUser } from './userSlice';

const UserManagement = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Officer',
        aadharNumber: '',
        phoneNumber: ''
    });
    const [editUserData, setEditUserData] = useState({ username: '', email: '', password: '', role: '' });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createUser(newUser)).unwrap();
            dispatch(fetchUsers()); // Refresh list
            setIsAddModalOpen(false);
            setNewUser({ username: '', email: '', password: '', role: 'Officer', aadharNumber: '', phoneNumber: '' });
            alert("User created successfully!");
        } catch (err) {
            alert("Failed to create user: " + (err.message || err));
        }
    };

    const handleOpenEdit = (user) => {
        setSelectedUser(user);
        setEditUserData({
            username: user.username,
            email: user.email,
            password: '',
            role: user.role
        });
        setIsEditModalOpen(true);
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateUser({ id: selectedUser.id, userData: editUserData })).unwrap();
            dispatch(fetchUsers()); // Refresh list
            setIsEditModalOpen(false);
            setSelectedUser(null);
            alert("User updated successfully!");
        } catch (err) {
            alert("Failed to update user: " + (err.message || err));
        }
    };

    const handleOpenDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteUser = async () => {
        try {
            await dispatch(deleteUser(selectedUser.id)).unwrap();
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
            alert("User deleted successfully!");
        } catch (err) {
            alert("Failed to delete user: " + (err.message || err));
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <FaSpinner className="animate-spin text-red-600 mb-4" size={32} />
                <p className="text-gray-500">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <FaPlus size={18} className="mr-2" /> Add New User
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
                    <p>Error loading users: {typeof error === 'string' ? error : JSON.stringify(error)}</p>
                    <button onClick={() => dispatch(fetchUsers())} className="ml-auto underline">Retry</button>
                </div>
            )}

            <Card className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-700">
                                                <FaUser size={20} />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 flex items-center">
                                        <FaShieldAlt size={16} className="mr-1 text-gray-400" /> {user.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-500">
                                        <div>Aadhar: {user.aadharNumber || 'N/A'}</div>
                                        <div>Phone: {user.phoneNumber || 'N/A'}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleOpenEdit(user)}
                                        className="text-gray-600 hover:text-gray-900 mr-4 transition-colors"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleOpenDelete(user)}
                                        className="text-red-600 hover:text-red-900 transition-colors"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User">
                <form onSubmit={handleAddUser} className="space-y-4">
                    <Input
                        label="Full Name"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Aadhar Number"
                            value={newUser.aadharNumber}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 12) setNewUser({ ...newUser, aadharNumber: val });
                            }}
                            maxLength="12"
                            required
                        />
                        <Input
                            label="Phone Number"
                            value={newUser.phoneNumber}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 10) setNewUser({ ...newUser, phoneNumber: val });
                            }}
                            maxLength="10"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        >
                            <option value="Officer">Census Officer</option>
                            <option value="Admin">Administrator</option>
                            <option value="Citizen">Citizen</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create User</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User">
                <form onSubmit={handleEditUser} className="space-y-4">
                    <Input
                        label="Full Name"
                        value={editUserData.username}
                        onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={editUserData.email}
                        onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            value={editUserData.password}
                            onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={editUserData.role}
                            onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        >
                            <option value="Officer">Census Officer</option>
                            <option value="Admin">Administrator</option>
                            <option value="Citizen">Citizen</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete user <strong className="text-gray-900">{selectedUser?.username}</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">Delete User</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
