import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Accessibility</span>
                        Accessibility
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Privacy Policy</span>
                        Privacy
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Terms</span>
                        Terms
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Contact</span>
                        Help Center
                    </a>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Citizen Record Information System (CivicID). Government of Valarixx.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
