import React from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { UserPlus } from 'lucide-react';

const EnrollmentForm = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">New Citizen Enrollment</h1>
                <p className="text-gray-500">Register a new birth or resident in the system.</p>
            </div>

            <Card>
                <form className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                        <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                            <UserPlus size={18} className="mr-2" /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="First Name" id="firstName" placeholder="John" />
                            <Input label="Last Name" id="lastName" placeholder="Doe" />
                            <Input label="Date of Birth" id="dob" type="date" />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                    <option>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Transgender">Transgender</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                        <h3 className="text-md font-medium text-gray-900 mb-2">Residency Details</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <Input label="Street Address" id="address" placeholder="123 Main St" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input label="City" id="city" />
                                <Input label="State" id="state" />
                                <Input label="Zip Code" id="zip" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" type="button">Cancel</Button>
                        <Button type="submit">Register Citizen</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EnrollmentForm;
