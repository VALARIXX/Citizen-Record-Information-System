import React, { useState } from 'react';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PhoneInput from '../../components/PhoneInput';
import { User, Users, Home, ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HouseholdView = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        relation: '',
        age: '',
        gender: 'Male',
        dob: '',
        phone: '',
        phoneCountry: '+91',
        idNumber: ''
    });

    const [members, setMembers] = useState([
        { id: 1, name: 'John Doe', relation: 'Head of Household', age: 34, gender: 'Male', status: 'Active', avatar: 'JD' },
        { id: 2, name: 'Jane Doe', relation: 'Spouse', age: 32, gender: 'Female', status: 'Active', avatar: 'JD' },
        { id: 3, name: 'Michael Doe', relation: 'Son', age: 8, gender: 'Male', status: 'Active', avatar: 'MD' },
        { id: 4, name: 'Sarah Doe', relation: 'Daughter', age: 5, gender: 'Female', status: 'Active', avatar: 'SD' },
    ]);

    const household = {
        address: '123 Maple Avenue, Springfield, SP 12345',
        familyId: 'FAM-2023-8821',
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        const member = {
            id: members.length + 1,
            name: newMember.name,
            relation: newMember.relation,
            age: parseInt(newMember.age),
            gender: newMember.gender,
            status: 'Pending',
            avatar: newMember.name.charAt(0).toUpperCase() + (newMember.name.split(' ')[1]?.[0]?.toUpperCase() || '')
        };
        setMembers([...members, member]);
        setIsModalOpen(false);
        setNewMember({ name: '', relation: '', age: '', gender: 'Male', dob: '', phone: '', phoneCountry: '+91', idNumber: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Household Relationships</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage family members and view residency details.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="hidden sm:flex">
                    <Plus size={18} className="mr-2" /> Add Member
                </Button>
            </div>

            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
                <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                        <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-red-700">
                            <Home size={28} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">The Doe Family</h2>
                            <p className="text-sm text-gray-600">{household.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <div>
                            <p className="text-gray-500 font-medium uppercase text-xs">Family ID</p>
                            <p className="font-mono text-gray-900 font-semibold">{household.familyId}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium uppercase text-xs">Total Members</p>
                            <p className="font-mono text-gray-900 font-semibold">{members.length}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-8 mb-4">
                <Users size={20} className="mr-2 text-red-600" />
                Family Members
            </h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <div key={member.id} className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className={`h-1.5 w-full ${member.relation === 'Head of Household' ? 'bg-red-700' : 'bg-yellow-400'}`}></div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border-2 border-white shadow-sm">
                                    {member.avatar}
                                </div>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                    {member.status}
                                </span>
                            </div>
                            <h4 className="text-base font-bold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-red-600 font-medium mb-2">{member.relation}</p>
                            <div className="flex items-center text-xs text-gray-500 space-x-3 mt-4 pt-4 border-t border-gray-50">
                                <span>Age: <strong className="text-gray-700">{member.age}</strong></span>
                                <span>•</span>
                                <span>Gender: <strong className="text-gray-700">{member.gender}</strong></span>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group min-h-[200px]"
                >
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-100 group-hover:text-red-600 mb-3 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-red-700">Add New Member</span>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Family Member">
                <form onSubmit={handleAddMember} className="space-y-4">
                    <Input
                        label="Full Name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        placeholder="e.g. Baby Doe"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                            <select
                                value={newMember.relation}
                                onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                required
                            >
                                <option value="">Select...</option>
                                <option>Spouse</option>
                                <option>Son</option>
                                <option>Daughter</option>
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Sibling</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                value={newMember.gender}
                                onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Date of Birth"
                            type="date"
                            value={newMember.dob}
                            onChange={(e) => setNewMember({ ...newMember, dob: e.target.value })}
                            required
                        />
                        <Input
                            label="Age"
                            type="number"
                            value={newMember.age}
                            onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                            placeholder="e.g. 25"
                            required
                        />
                    </div>

                    <PhoneInput
                        label="Contact Phone"
                        value={newMember.phone}
                        countryCode={newMember.phoneCountry}
                        onChange={(val) => setNewMember({ ...newMember, phone: val })}
                        onCountryChange={(code) => setNewMember({ ...newMember, phoneCountry: code })}
                    />

                    <Input
                        label="ID Number (Aadhaar/Passport)"
                        value={newMember.idNumber}
                        onChange={(e) => setNewMember({ ...newMember, idNumber: e.target.value })}
                        placeholder="XXXX-XXXX-XXXX"
                    />

                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
                        <Button type="submit">Add Member</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default HouseholdView;
