import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from './authSlice';
import { FaLayerGroup, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import Logo from '../../components/Logo';
import { USERS } from '../../data/loginCredentials';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const foundUser = USERS.find(u => u.email === email && u.password === password);

            if (foundUser) {
                dispatch(loginSuccess({
                    user: {
                        name: foundUser.name,
                        email: foundUser.email,
                        id: foundUser.id,
                    },
                    token: 'mock-jwt-token',
                    role: foundUser.role,
                }));

                const role = foundUser.role;
                if (role === 'ADMIN') navigate('/admin');
                else if (role === 'OFFICER') navigate('/census');
                else navigate('/citizen');
            } else {
                setError('Invalid email or password');
            }

            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex bg-white">

            <div className="hidden lg:flex lg:w-1/2 bg-red-900 relative flex-col justify-between p-12 overflow-hidden text-white">
                <div className="relative z-10">
                    <div className="mb-10">
                        <Logo iconColor="text-red-900" textColor="text-white bg-yellow-400 p-1 rounded" />
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-6">
                        Secure Digital Identity <br /> for Every Citizen.
                    </h2>
                    <p className="text-lg text-red-200 max-w-md">
                        The official government portal for managing demographic data, residency information, and certificate services.
                    </p>
                </div>

                <div className="relative z-10 flex gap-4 text-sm text-red-300">
                    <span>&copy; 2026 Gov of Valarixx</span>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>

                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[600px] w-[600px] rounded-full bg-red-800/50 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-yellow-600/20 blur-3xl"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-gray-50">
                <div className="mx-auto w-full max-w-sm lg:w-96">

                    <div className="lg:hidden mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">CivicID</h2>
                    </div>

                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or <a href="#" className="font-medium text-red-700 hover:text-red-600">register for a new citizen ID</a>
                        </p>
                        {error && (
                            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100 flex items-center gap-2">
                                <FaShieldAlt size={14} className="flex-shrink-0" />
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="bg-white py-8 px-4 shadow-xl shadow-red-100 sm:rounded-2xl sm:px-10 border border-gray-100/50">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-red-700 hover:text-red-600">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md shadow-red-500/30 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Logging in...' : 'Sign In'} <FaArrowRight size={18} className="ml-2" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Demo Credentials</p>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between text-xs p-2 bg-blue-50/50 rounded-lg">
                                    <span className="font-medium text-blue-700">Admin</span>
                                    <code className="text-blue-600">gokul@civic.id / password123</code>
                                </div>
                                <div className="flex justify-between text-xs p-2 bg-emerald-50/50 rounded-lg">
                                    <span className="font-medium text-emerald-700">Officer</span>
                                    <code className="text-emerald-600">abdul@civic.id / password123</code>
                                </div>
                                <div className="flex justify-between text-xs p-2 bg-red-50/50 rounded-lg">
                                    <span className="font-medium text-red-700">Citizen</span>
                                    <code className="text-red-600">arjun@civic.id / password123</code>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-8 text-center text-xs text-gray-400 flex justify-center items-center gap-1">
                    <FaShieldAlt size={14} />
                    <span>Official Government Portal • 256-bit Encryption</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
