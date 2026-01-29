import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { loginSuccess } from '../auth/authSlice';
import { calculateAge } from '../../utils/calculateAge';
import PhoneInput from '../../components/PhoneInput';

const CitizenProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        ...user,
        address: '12, Bharathi Street, Gandhi Nagar, Madurai, Tamil Nadu - 625020',
        dob: '1995-08-25',
        phone: '+91 98456 78901',
        occupation: 'Software Developer',
        bloodGroup: 'B+',
        nationality: 'Indian',
        fatherName: 'Ranganathan',
        motherName: 'Meenakshi',
        maritalStatus: 'Single',
        name: user?.name || 'Balaji',
        email: user?.email || 'balaji@example.in',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {

        console.log('Saving profile:', formData);

        dispatch(loginSuccess({
            user: { ...user, name: formData.name, email: formData.email },
            role: 'CITIZEN'
        }));

        setIsEditing(false);
    };

    const handleCancel = () => {

        setIsEditing(false);
    };

    const handlePhotoUpload = () => {

        console.log('Opening photo upload...');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                {isEditing ? (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                            <FaTimes size={16} /> Cancel
                        </Button>
                        <Button onClick={handleSave} className="flex items-center gap-2">
                            <FaSave size={16} /> Save Changes
                        </Button>
                    </div>
                ) : (
                    <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit Information</Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-1">
                    <Card className="text-center h-full">

                        <div className="relative w-32 h-32 mx-auto mb-4 group">
                            <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center text-red-500 overflow-hidden">
                                <FaUser size={64} />
                            </div>

                            <button
                                onClick={handlePhotoUpload}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                            >
                                <FaCamera size={24} className="text-white mb-1" />
                                <span className="text-white text-xs font-medium">Change Photo</span>
                            </button>

                            <div className="absolute bottom-0 right-0 p-2 bg-red-600 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition-colors" onClick={handlePhotoUpload}>
                                <FaCamera size={16} className="text-white" />
                            </div>
                        </div>

                        {isEditing ? (
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="text-center font-bold text-gray-900 border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                            />
                        ) : (
                            <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
                        )}

                        {isEditing ? (
                            <input
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="text-center text-sm text-gray-500 border-b border-gray-300 focus:border-red-500 focus:outline-none w-full mt-2"
                            />
                        ) : (
                            <p className="text-sm text-gray-500 mb-4">{formData.occupation}</p>
                        )}

                        <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                                <FaEnvelope size={16} className="mr-2 text-red-500" />
                                {isEditing ? (
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                    />
                                ) : formData.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <FaPhone size={16} className="mr-2 text-red-500" />
                                {isEditing ? (
                                    <PhoneInput
                                        value={formData.phone}
                                        onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                                        className="!w-full"
                                    />
                                ) : formData.phone}
                            </div>
                            <div className="flex items-start text-sm text-gray-600">
                                <FaMapMarkerAlt size={16} className="mr-2 mt-1 text-red-500" />
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full resize-none"
                                        rows="2"
                                    />
                                ) : formData.address}
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card title="Personal Details">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            {[
                                { label: 'Date of Birth', name: 'dob', type: 'date' },
                                { label: 'Age', name: 'age', static: formData.dob ? `${calculateAge(formData.dob)} years` : 'N/A', computed: true },
                                { label: 'Gender', name: 'gender', static: 'Male' },
                                { label: 'Blood Group', name: 'bloodGroup' },
                                { label: 'Nationality', name: 'nationality' },
                                { label: 'Marital Status', name: 'maritalStatus' }
                            ].map((field) => (
                                <div key={field.label}>
                                    <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {field.computed ? (
                                            <span className="font-semibold text-red-700">{field.static}</span>
                                        ) : isEditing && !field.static ? (
                                            field.type === 'date' ? (
                                                <input
                                                    type="date"
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                                />
                                            ) : (
                                                <input
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                                />
                                            )
                                        ) : (
                                            field.static || formData[field.name]
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Card>

                    <Card title="Family Information">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            {[
                                { label: "Father's Name", name: 'fatherName' },
                                { label: "Mother's Name", name: 'motherName' }
                            ].map((field) => (
                                <div key={field.label}>
                                    <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {isEditing ? (
                                            <input
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                            />
                                        ) : formData[field.name]}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CitizenProfile;
