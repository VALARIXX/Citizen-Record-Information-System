import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { FaCreditCard, FaGooglePay, FaUniversity, FaLock, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PaymentPage = () => {
    const { profile } = useSelector((state) => state.citizen);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const requestId = searchParams.get('requestId');
    const type = searchParams.get('type');
    const amount = searchParams.get('amount');

    const [selectedMethod, setSelectedMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        if (!selectedMethod) return;

        setIsProcessing(true);

        const transactionId = 'TXN' + Date.now();
        const payload = {
            citizenId: profile?.citizenId || user?.id || 'GUEST',
            requestId: requestId,
            amount: parseFloat(amount),
            paymentMethod: selectedMethod,
            status: 'SUCCESS', // Sandbox: Assume success
            transactionId: transactionId
        };

        try {
            await api.post('/api/payments/initiate', payload);

            // Navigate to success page
            navigate('/citizen/payment/success', {
                state: {
                    requestId,
                    type,
                    amount,
                    transactionId: transactionId,
                    date: new Date().toLocaleDateString()
                }
            });
        } catch (error) {
            console.error("Payment failed", error);
            alert("Payment processing failed. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Gateway (Sandbox)</h1>

            <div className="grid gap-6">
                {/* Order Summary */}
                <Card className="p-6 bg-white shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Request ID</span>
                            <span className="font-medium text-gray-900">{requestId}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Service</span>
                            <span className="font-medium text-gray-900">{type}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Processing Fee</span>
                            <span className="font-medium text-gray-900">₹{amount}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
                            <span>Total Payable</span>
                            <span>₹{amount}</span>
                        </div>
                    </div>
                </Card>

                {/* Payment Methods */}
                <Card className="p-6 bg-white shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h2>

                    <div className="space-y-3">
                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'card' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={selectedMethod === 'card'}
                                onChange={() => setSelectedMethod('card')}
                                className="mr-3 h-4 w-4 text-blue-600"
                            />
                            <FaCreditCard className="text-gray-500 mr-3" size={20} />
                            <div>
                                <span className="block font-medium text-gray-900">Credit / Debit Card</span>
                                <span className="text-xs text-gray-500">Visa, Mastercard, RuPay</span>
                            </div>
                        </label>

                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'upi' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="upi"
                                checked={selectedMethod === 'upi'}
                                onChange={() => setSelectedMethod('upi')}
                                className="mr-3 h-4 w-4 text-blue-600"
                            />
                            <FaGooglePay className="text-gray-500 mr-3" size={20} />
                            <div>
                                <span className="block font-medium text-gray-900">UPI</span>
                                <span className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</span>
                            </div>
                        </label>

                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'netbanking' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="netbanking"
                                checked={selectedMethod === 'netbanking'}
                                onChange={() => setSelectedMethod('netbanking')}
                                className="mr-3 h-4 w-4 text-blue-600"
                            />
                            <FaUniversity className="text-gray-500 mr-3" size={20} />
                            <div>
                                <span className="block font-medium text-gray-900">Net Banking</span>
                                <span className="text-xs text-gray-500">All Indian Banks Supported</span>
                            </div>
                        </label>
                    </div>
                </Card>

                {/* Pay Button */}
                <Button
                    onClick={handlePayment}
                    disabled={!selectedMethod || isProcessing}
                    className="w-full py-3 text-lg flex items-center justify-center justify-items-center"
                >
                    {isProcessing ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" /> Processing...
                        </>
                    ) : (
                        <>
                            <FaLock className="mr-2" size={14} /> Pay ₹{amount}
                        </>
                    )}
                </Button>

                <p className="text-center text-xs text-gray-500 mt-2">
                    <FaLock className="inline mr-1" size={10} />
                    Secure Payment Gateway. This is a sandbox environment. No real money will be deducted.
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;
