import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSave, FaTimes, FaCamera, FaSpinner } from 'react-icons/fa';
import { updateUser } from '../auth/authSlice';
import { calculateAge } from '../../utils/calculateAge';
import PhoneInput from '../../components/PhoneInput';
import { fetchCitizenProfile, updateCitizenProfile, enrollCitizen } from './citizenSlice';

const CitizenProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { profile, loading, error } = useSelector((state) => state.citizen);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isNewProfile, setIsNewProfile] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        dob: '',
        phone: '',
        occupation: '',
        bloodGroup: '',
        nationality: '',
        fatherName: '',
        motherName: '',
        maritalStatus: '',
        aadharNumber: user?.aadharNumber || '',
    });

    useEffect(() => {
        if (user?.id || user?.aadharNumber) {
            const identifier = user.aadharNumber || user.id;
            dispatch(fetchCitizenProfile(identifier));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                ...profile,
                name: profile.fullName || prev.name,
                dob: profile.dateOfBirth || prev.dob,
                phone: profile.mobile || prev.phone
            }));
            setIsNewProfile(false);
        } else if (error && error.includes('not found')) {
            setIsNewProfile(true);
        }
    }, [profile, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        // Validation: Ensure all fields are filled
        const requiredFields = [
            { key: 'name', label: 'Full Name' },
            { key: 'email', label: 'Email' },
            { key: 'address', label: 'Address' },
            { key: 'dob', label: 'Date of Birth' },
            { key: 'phone', label: 'Phone' },
            { key: 'occupation', label: 'Occupation' },
            { key: 'bloodGroup', label: 'Blood Group' },
            { key: 'nationality', label: 'Nationality' },
            { key: 'fatherName', label: "Father's Name" },
            { key: 'motherName', label: "Mother's Name" },
            { key: 'maritalStatus', label: 'Marital Status' },
            { key: 'aadharNumber', label: 'Aadhar Number' },
        ];

        const missingFields = requiredFields.filter(f => !formData[f.key]);
        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
            return;
        }

        try {
            const payload = {
                ...formData,
                fullName: formData.name,
                dateOfBirth: formData.dob,
                mobile: formData.phone,
                residencyStatus: 'ACTIVE'
            };

            if (isNewProfile) {
                await dispatch(enrollCitizen(payload)).unwrap();
                setIsNewProfile(false);
            } else {
                const identifier = profile?.citizenId || formData.citizenId || user.id;
                await dispatch(updateCitizenProfile({ identifier, data: payload })).unwrap();
            }

            dispatch(updateUser({
                name: formData.name,
                email: formData.email
            }));
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile: " + (error.message || error));
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                ...profile,
                name: profile.fullName || prev.name,
                dob: profile.dateOfBirth || prev.dob,
                phone: profile.mobile || prev.phone
            }));
        }
        setIsEditing(false);
    };

    if (loading && !profile) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-3xl text-red-600" />
            </div>
        );
    }

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
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-gray-400 block text-left">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="text-center font-bold text-gray-900 border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                    required
                                />
                            </div>
                        ) : (
                            <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
                        )}

                        {isEditing ? (
                            <div className="space-y-1 mt-2">
                                <label className="text-[10px] uppercase font-bold text-gray-400 block text-left">Occupation <span className="text-red-500">*</span></label>
                                <input
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    className="text-center text-sm text-gray-500 border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                    required
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mb-4">{formData.occupation}</p>
                        )}

                        <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                                <FaEnvelope size={16} className="mr-2 text-red-500" />
                                {isEditing ? (
                                    <div className="flex-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block">Email <span className="text-red-500">*</span></label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                            required
                                        />
                                    </div>
                                ) : formData.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <FaPhone size={16} className="mr-2 text-red-500" />
                                {isEditing ? (
                                    <div className="flex-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block">Phone <span className="text-red-500">*</span></label>
                                        <PhoneInput
                                            value={formData.phone}
                                            onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                                            className="!w-full"
                                            required
                                        />
                                    </div>
                                ) : formData.phone}
                            </div>
                            <div className="flex items-start text-sm text-gray-600">
                                <FaMapMarkerAlt size={16} className="mr-2 mt-1 text-red-500" />
                                {isEditing ? (
                                    <div className="flex-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block">Address <span className="text-red-500">*</span></label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full resize-none"
                                            rows="2"
                                            required
                                        />
                                    </div>
                                ) : formData.address}
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card title="Personal Details">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            {[
                                { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
                                { label: 'Age', name: 'age', static: formData.dob ? `${calculateAge(formData.dob)} years` : 'N/A', computed: true },
                                { label: 'Gender', name: 'gender', required: true },
                                { label: 'Blood Group', name: 'bloodGroup', required: true },
                                { label: 'Nationality', name: 'nationality', required: true },
                                { label: 'Marital Status', name: 'maritalStatus', required: true }
                            ].map((field) => (
                                <div key={field.label}>
                                    <dt className="text-sm font-medium text-gray-500">
                                        {field.label} {field.required && isEditing && <span className="text-red-500">*</span>}
                                    </dt>
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
                                                    required={field.required}
                                                />
                                            ) : (
                                                <input
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                                    required={field.required}
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

                    <Card title="Identity Information">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Aadhar Number {isEditing && <span className="text-red-500">*</span>}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {isEditing ? (
                                        <input
                                            name="aadharNumber"
                                            value={formData.aadharNumber}
                                            onChange={handleChange}
                                            maxLength={14}
                                            placeholder="XXXX XXXX XXXX"
                                            className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full font-mono tracking-wide"
                                            required
                                        />
                                    ) : (
                                        <span className="font-mono tracking-wide">{formData.aadharNumber}</span>
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </Card>

                    <Card title="Family Information">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            {[
                                { label: "Father's Name", name: 'fatherName', required: true },
                                { label: "Mother's Name", name: 'motherName', required: true }
                            ].map((field) => (
                                <div key={field.label}>
                                    <dt className="text-sm font-medium text-gray-500">
                                        {field.label} {field.required && isEditing && <span className="text-red-500">*</span>}
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {isEditing ? (
                                            <input
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="border-b border-gray-300 focus:border-red-500 focus:outline-none w-full"
                                                required={field.required}
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
