import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';
import { FaLayerGroup, FaShieldAlt, FaArrowRight, FaUserPlus, FaSignInAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';
import Logo from '../components/Logo';
import PhoneInput from '../components/PhoneInput';

const LandingPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleShowAuth = (isLogin) => {
        setIsLoginMode(isLogin);
        setShowAuthForm(true);
        setTimeout(() => {
            document.getElementById('auth-card')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            let role = 'CITIZEN';
            if (loginEmail.includes('admin')) role = 'ADMIN';
            else if (loginEmail.includes('officer')) role = 'OFFICER';

            const mockUser = {
                name: loginEmail.split('@')[0],
                email: loginEmail,
                id: '12345',
            };

            dispatch(loginSuccess({
                user: mockUser,
                token: 'mock-jwt-token',
                role: role,
            }));

            setLoading(false);

            if (role === 'ADMIN') navigate('/admin');
            else if (role === 'OFFICER') navigate('/census');
            else navigate('/citizen');

        }, 1000);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const mockUser = {
                name: registerData.name,
                email: registerData.email,
                id: 'new-user-123',
            };

            dispatch(loginSuccess({
                user: mockUser,
                token: 'mock-jwt-token',
                role: 'CITIZEN',
            }));

            setLoading(false);
            navigate('/citizen');
        }, 1200);
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Logo />
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
                        <a href="#features" className="hover:text-red-700 transition-colors">Services</a>
                        <a href="#about" className="hover:text-red-700 transition-colors">About</a>
                        <a href="#contact" className="hover:text-red-700 transition-colors">Contact</a>
                        <div className="flex gap-2 ml-4">
                            <button
                                onClick={() => handleShowAuth(true)}
                                className="px-4 py-1.5 text-sm font-medium text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => handleShowAuth(false)}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    </nav>

                    <div className="md:hidden flex gap-2">
                        <button
                            onClick={() => handleShowAuth(true)}
                            className="px-3 py-1.5 text-sm font-medium text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => handleShowAuth(false)}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 gap-12 items-center">

                <div className={`${showAuthForm ? 'lg:w-1/2' : 'lg:w-full text-center'} space-y-8 transition-all duration-300`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold uppercase tracking-wide">
                        <FaShieldAlt size={14} />
                        Official Government Portal
                    </div>

                    <h1 className={`text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] ${!showAuthForm ? 'max-w-3xl mx-auto' : ''}`}>
                        Unified Digital Identity for <span className="text-red-700">All Citizens.</span>
                    </h1>

                    <p className={`text-lg text-gray-600 leading-relaxed ${!showAuthForm ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
                        Access government services, manage your household records, and request certificates seamlessly. A secure, transparent, and efficient system built for you.
                    </p>

                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${!showAuthForm ? 'max-w-lg mx-auto' : 'max-w-lg'}`}>
                        {[
                            "Instant Certificate Issuance",
                            "Secure Household Registry",
                            "Real-time Application Tracking",
                            "24/7 Digital Access"
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <FaCheckCircle size={16} className="text-yellow-500 shrink-0" />
                                {feature}
                            </div>
                        ))}
                    </div>

                    {!showAuthForm && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <button
                                onClick={() => handleShowAuth(true)}
                                className="px-8 py-3 text-lg font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                            >
                                <FaSignInAlt size={20} />
                                Sign In to Portal
                            </button>
                            <button
                                onClick={() => handleShowAuth(false)}
                                className="px-8 py-3 text-lg font-semibold text-red-700 bg-white border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <FaUserPlus size={20} />
                                Create Account
                            </button>
                        </div>
                    )}
                </div>

                {showAuthForm && (
                    <div id="auth-card" className="lg:w-1/2 w-full max-w-md mx-auto lg:mr-0 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-white rounded-2xl shadow-xl shadow-red-900/5 border border-red-100 overflow-hidden relative">

                            <button
                                onClick={() => setShowAuthForm(false)}
                                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FaTimes size={18} />
                            </button>

                            <div className="flex text-sm font-medium border-b border-gray-100">
                                <button
                                    onClick={() => setIsLoginMode(true)}
                                    className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${isLoginMode ? 'text-red-700 bg-red-50/50 border-b-2 border-red-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <FaSignInAlt size={18} /> Sign In
                                </button>
                                <button
                                    onClick={() => setIsLoginMode(false)}
                                    className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${!isLoginMode ? 'text-red-700 bg-red-50/50 border-b-2 border-red-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <FaUserPlus size={18} /> New Account
                                </button>
                            </div>

                            <div className="p-8">
                                {isLoginMode ? (

                                    <form onSubmit={handleLogin} className="space-y-5">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Accessing...' : 'Access Portal'}
                                            {!loading && <FaArrowRight size={18} />}
                                        </button>

                                        <div className="text-center">
                                            <a href="#" className="text-sm text-red-600 hover:text-red-700 font-medium">Forgot your password?</a>
                                        </div>
                                    </form>
                                ) : (

                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={registerData.name}
                                                onChange={handleRegisterChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={registerData.email}
                                                    onChange={handleRegisterChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                                <PhoneInput
                                                    value={registerData.phone}
                                                    onChange={(phone) => setRegisterData(prev => ({ ...prev, phone }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                required
                                                value={registerData.password}
                                                onChange={handleRegisterChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Creating Account...' : 'Create Citizen Account'}
                                            {!loading && <FaUserPlus size={18} />}
                                        </button>
                                    </form>
                                )}
                            </div>
                            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center text-xs text-gray-500">
                                By continuing, you agree to the Terms of Service and Privacy Policy of the Valarixx Government.
                            </div>
                        </div>
                    </div>
                )}

            </main>

            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Government Services</h2>
                        <p className="mt-4 text-lg text-gray-500">Efficient, transparent, and accessible services for every citizen.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Identity Verification', desc: 'Secure biometric and demographic verification.', icon: FaShieldAlt },
                            { title: 'Certificate Issuance', desc: 'Instant digital birth, income, and community certificates.', icon: FaLayerGroup },
                            { title: 'Household Registry', desc: 'Manage your family records in one secure place.', icon: FaUserPlus }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-red-50 rounded-xl border border-red-100 hover:shadow-lg transition-shadow">
                                <div className="p-3 bg-red-100 w-fit rounded-lg text-red-700 mb-4">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            <section id="about" className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-900 rounded-3xl p-8 md:p-16 text-white text-center">
                        <h2 className="text-3xl font-bold mb-6">About CivicID</h2>
                        <p className="max-w-3xl mx-auto text-lg text-red-100 leading-relaxed">
                            CivicID is the official digital infrastructure initiative by the Government of Valarixx.
                            Our mission is to empower citizens with a secure, unified digital identity that simplifies
                            interactions with public services, ensures data privacy, and promotes efficient governance.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-20 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Support</h2>
                    <p className="text-gray-600 mb-8">Need assistance? Our support team is available 24/7.</p>
                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                            Help Center
                        </button>
                        <button className="px-6 py-3 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800">
                            support@valarixx.gov
                        </button>
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
                <p>&copy; 2026 Government of Valarixx. All rights reserved.</p>
            </footer>
        </div >
    );
};

export default LandingPage;
