import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PhoneInput from '../../components/PhoneInput';
import { FaFileAlt, FaDownload, FaClock, FaPlus, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { fetchCitizenRequests, createCertificateRequest } from './certificateSlice';

const CertificateRequest = () => {
    const { user } = useSelector((state) => state.auth);
    const { requests, loading } = useSelector((state) => state.certificate);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestData, setRequestData] = useState({
        type: 'Birth Certificate',
        purpose: '',
        urgency: 'Normal',
        deliveryAddress: '',
        phone: '',
        phoneCountry: '+91',
        notes: '',

        childName: '',
        childDob: '',
        placeOfBirth: '',
        fatherName: '',
        motherName: '',
        hospitalName: '',

        deceasedName: '',
        dateOfDeath: '',
        placeOfDeath: '',
        causeOfDeath: '',
        relationToDeceased: '',

        annualIncome: '',
        sourceOfIncome: '',
        employerName: '',
        employmentType: '',

        communityName: '',
        subCaste: '',
        religion: '',

        currentAddress: '',
        durationOfResidence: '',
        propertyOwnership: ''
    });

    const [certificates, setCertificates] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Determine amount based on certificate type (mock logic)
        let amount = 50; // Default
        if (requestData.type === 'Income Certificate') amount = 100;
        if (requestData.type === 'Community Certificate') amount = 75;

        try {
            const payload = {
                citizenId: user?.id || 'GUEST', // Fallback if testing without login
                type: requestData.type,
                status: 'PENDING',
                requestDetails: JSON.stringify(requestData) // Store dynamic form data
            };

            const resultAction = await dispatch(createCertificateRequest(payload)).unwrap();
            const newRequest = resultAction;

            // Navigate to payment page with state
            navigate(`/citizen/payment?requestId=${newRequest.requestId}&type=${encodeURIComponent(requestData.type)}&amount=${amount}`);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to submit request", error);
            alert("Failed to submit request: " + (error.message || error));
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Issued': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Use requests from Redux store instead of local state
    const displayCertificates = requests || [];

    // Fetch certificates on component mount
    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCitizenRequests(user.id));
        }
    }, [user, dispatch]);

    const renderCertificateFields = () => {
        switch (requestData.type) {
            case 'Birth Certificate':
                return (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 text-sm">Birth Certificate Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Child's Full Name"
                                value={requestData.childName}
                                onChange={(e) => setRequestData({ ...requestData, childName: e.target.value })}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={requestData.childDob}
                                    onChange={(e) => setRequestData({ ...requestData, childDob: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                />
                            </div>
                            <Input
                                label="Place of Birth"
                                value={requestData.placeOfBirth}
                                onChange={(e) => setRequestData({ ...requestData, placeOfBirth: e.target.value })}
                                required
                            />
                            <Input
                                label="Hospital / Place of Birth"
                                placeholder="e.g. Apollo Hospital, Greams Road, Chennai"
                                value={requestData.hospitalName}
                                onChange={(e) => setRequestData({ ...requestData, hospitalName: e.target.value })}
                                required
                            />
                            <Input
                                label="Father's Full Name"
                                placeholder="Ranganathan S"
                                value={requestData.fatherName}
                                onChange={(e) => setRequestData({ ...requestData, fatherName: e.target.value })}
                                required
                            />
                            <Input
                                label="Mother's Full Name"
                                placeholder="Meenakshi R"
                                value={requestData.motherName}
                                onChange={(e) => setRequestData({ ...requestData, motherName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                );

            case 'Death Certificate':
                return (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 text-sm">Death Certificate Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Deceased's Full Name"
                                value={requestData.deceasedName}
                                onChange={(e) => setRequestData({ ...requestData, deceasedName: e.target.value })}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Death</label>
                                <input
                                    type="date"
                                    value={requestData.dateOfDeath}
                                    onChange={(e) => setRequestData({ ...requestData, dateOfDeath: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                />
                            </div>
                            <Input
                                label="Place of Death"
                                value={requestData.placeOfDeath}
                                onChange={(e) => setRequestData({ ...requestData, placeOfDeath: e.target.value })}
                                required
                            />
                            <Input
                                label="Cause of Death"
                                value={requestData.causeOfDeath}
                                onChange={(e) => setRequestData({ ...requestData, causeOfDeath: e.target.value })}
                                required
                            />
                            <Input
                                label="Your Relation to Deceased"
                                value={requestData.relationToDeceased}
                                onChange={(e) => setRequestData({ ...requestData, relationToDeceased: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                );

            case 'Income Certificate':
                return (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 text-sm">Income Certificate Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Annual Income (₹)"
                                value={requestData.annualIncome}
                                onChange={(e) => setRequestData({ ...requestData, annualIncome: e.target.value })}
                                type="number"
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source of Income</label>
                                <select
                                    value={requestData.sourceOfIncome}
                                    onChange={(e) => setRequestData({ ...requestData, sourceOfIncome: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                >
                                    <option value="">Select source</option>
                                    <option value="Salary">Salary/Wages</option>
                                    <option value="Business">Business/Self-employed</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Pension">Pension</option>
                                    <option value="Rental">Rental Income</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <Input
                                label="Employer/Business Name"
                                value={requestData.employerName}
                                onChange={(e) => setRequestData({ ...requestData, employerName: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                                <select
                                    value={requestData.employmentType}
                                    onChange={(e) => setRequestData({ ...requestData, employmentType: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                >
                                    <option value="">Select type</option>
                                    <option value="Government">Government</option>
                                    <option value="Private">Private Sector</option>
                                    <option value="SelfEmployed">Self-Employed</option>
                                    <option value="Unemployed">Unemployed</option>
                                    <option value="Retired">Retired</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'Community Certificate':
                return (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 text-sm">Community Certificate Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Community/Caste Name"
                                value={requestData.communityName}
                                onChange={(e) => setRequestData({ ...requestData, communityName: e.target.value })}
                                required
                            />
                            <Input
                                label="Sub-Caste (if applicable)"
                                value={requestData.subCaste}
                                onChange={(e) => setRequestData({ ...requestData, subCaste: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                                <select
                                    value={requestData.religion}
                                    onChange={(e) => setRequestData({ ...requestData, religion: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                >
                                    <option value="">Select religion</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Sikh">Sikh</option>
                                    <option value="Buddhist">Buddhist</option>
                                    <option value="Jain">Jain</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'Residence Certificate':
                return (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 text-sm">Residence Certificate Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Residence Address</label>
                                <textarea
                                    value={requestData.currentAddress}
                                    onChange={(e) => setRequestData({ ...requestData, currentAddress: e.target.value })}
                                    rows={2}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Residence</label>
                                <select
                                    value={requestData.durationOfResidence}
                                    onChange={(e) => setRequestData({ ...requestData, durationOfResidence: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                >
                                    <option value="">Select duration</option>
                                    <option value="<1">Less than 1 year</option>
                                    <option value="1-5">1-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">More than 10 years</option>
                                    <option value="birth">Since birth</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Ownership</label>
                                <select
                                    value={requestData.propertyOwnership}
                                    onChange={(e) => setRequestData({ ...requestData, propertyOwnership: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="owned">Owned</option>
                                    <option value="rented">Rented</option>
                                    <option value="leased">Leased</option>
                                    <option value="family">Family Property</option>
                                    <option value="government">Government Quarters</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
                    <p className="text-gray-500 text-sm mt-1">Request and manage your official certificates.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <FaPlus size={18} className="mr-2" /> Request Certificate
                </Button>
            </div>

            <div className="grid gap-4">
                {displayCertificates.map((cert) => (
                    <Card key={cert.requestId || cert.id} className="flex flex-col md:flex-row md:items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${cert.status === 'Issued' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                <FaFileAlt size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{cert.type}</h3>
                                <p className="text-sm text-gray-500">
                                    {cert.issuedDate ? `Issued: ${cert.issuedDate}` : 'Pending issuance'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(cert.status)}`}>
                                {cert.status === 'Processing' && <FaClock size={12} className="inline mr-1" />}
                                {cert.status === 'Issued' && <FaCheckCircle size={12} className="inline mr-1" />}
                                {cert.status}
                            </span>
                            {cert.downloadable && (
                                <Button variant="secondary" size="sm">
                                    <FaDownload size={16} className="mr-1" /> Download
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
                {loading && (
                    <div className="flex justify-center p-4">
                        <FaSpinner className="animate-spin text-2xl text-red-600" />
                    </div>
                )}
                {!loading && displayCertificates.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No certificate requests found.</p>
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request New Certificate" size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type</label>
                        <select
                            value={requestData.type}
                            onChange={(e) => setRequestData({ ...requestData, type: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        >
                            <option>Birth Certificate</option>
                            <option>Death Certificate</option>
                            <option>Income Certificate</option>
                            <option>Community Certificate</option>
                            <option>Residence Certificate</option>
                        </select>
                    </div>

                    {renderCertificateFields()}

                    <Input
                        label="Purpose of Request"
                        value={requestData.purpose}
                        onChange={(e) => setRequestData({ ...requestData, purpose: e.target.value })}
                        required
                    />


                    <Input
                        label="Delivery Address"
                        value={requestData.deliveryAddress}
                        onChange={(e) => setRequestData({ ...requestData, deliveryAddress: e.target.value })}
                        required
                    />

                    <PhoneInput
                        label="Contact Phone"
                        value={requestData.phone}
                        onChange={(val) => setRequestData({ ...requestData, phone: val })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                        <textarea
                            value={requestData.notes}
                            onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                            rows={3}
                            placeholder="Any special instructions or requirements..."
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 text-sm text-yellow-800">
                        <strong>Note:</strong> This process will take upto 3-5 business days. You will be notified once the certificate is ready.
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CertificateRequest;
