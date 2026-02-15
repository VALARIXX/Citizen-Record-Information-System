import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaArrowRight } from 'react-icons/fa';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    useEffect(() => {
        if (!state) {
            navigate('/citizen');
        }
    }, [state, navigate]);

    if (!state) return null;

    return (
        <div className="max-w-xl mx-auto py-12 px-4 text-center">
            <div className="mb-8 flex justify-center">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600" size={48} />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Your certificate request has been submitted successfully.</p>

            <Card className="p-6 bg-white shadow-sm border border-gray-100 text-left mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Transaction Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID</span>
                        <span className="font-mono font-medium text-gray-900">{state.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Request ID</span>
                        <span className="font-mono font-medium text-gray-900">{state.requestId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Certificate Type</span>
                        <span className="font-medium text-gray-900">{state.type}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid</span>
                        <span className="font-medium text-emerald-600">₹{state.amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium text-gray-900">{state.date}</span>
                    </div>
                </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate('/citizen/certificates')}>
                    <FaArrowRight className="mr-2" /> Track Status
                </Button>
                <Button onClick={() => alert('Downloading Mock Receipt...')}>
                    <FaDownload className="mr-2" /> Download Receipt
                </Button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
