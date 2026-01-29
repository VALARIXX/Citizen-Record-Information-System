import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { FaUser, FaTrash, FaEdit, FaShieldAlt, FaPlus, FaLock } from 'react-icons/fa';

const UserManagement = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [users, setUsers] = useState([
        { id: 1, name: 'Abdul', email: 'abdul@civic.id', role: 'OFFICER', status: 'Active' },
        { id: 2, name: 'Gokul', email: 'gokul@civic.id', role: 'ADMIN', status: 'Active' },
        { id: 3, name: 'Balaji', email: 'balaji@civic.id', role: 'OFFICER', status: 'Inactive' },
    ]);

    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'OFFICER' });
    const [editUser, setEditUser] = useState({ name: '', email: '', password: '', role: '' });

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: users.length + 1,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: 'Active'
        };
        setUsers([...users, user]);
        setIsAddModalOpen(false);
        setNewUser({ name: '', email: '', password: '', role: 'OFFICER' });
    };

    const handleOpenEdit = (user) => {
        setSelectedUser(user);
        setEditUser({ name: user.name, email: user.email, password: '', role: user.role });
        setIsEditModalOpen(true);
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        setUsers(users.map(u =>
            u.id === selectedUser.id
                ? { ...u, name: editUser.name, email: editUser.email, role: editUser.role }
                : u
        ));
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleOpenDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteUser = () => {
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <FaPlus size={18} className="mr-2" /> Add New User
                </Button>
            </div>

            <Card className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
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
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.status}
                                    </span>
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
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User">
                <form onSubmit={handleAddUser} className="space-y-4">
                    <Input
                        label="Full Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
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
                            <option value="OFFICER">Census Officer</option>
                            <option value="ADMIN">Administrator</option>
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
                        value={editUser.name}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            value={editUser.password}
                            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={editUser.role}
                            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        >
                            <option value="OFFICER">Census Officer</option>
                            <option value="ADMIN">Administrator</option>
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
                        Are you sure you want to delete user <strong className="text-gray-900">{selectedUser?.name}</strong>?
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
