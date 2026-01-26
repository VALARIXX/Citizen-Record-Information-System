import React from 'react';

const Logo = ({ className = "h-10 w-10", iconColor = "text-white", textColor = "text-gray-900", showText = true }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`${className} bg-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3/5 h-3/5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                </svg>
            </div>
            {showText && (
                <div className="flex flex-col">
                    <h1 className={`text-xl font-bold tracking-tight leading-none ${textColor}`}>CivicID</h1>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-red-700/60">Gov Portal</p>
                </div>
            )}
        </div>
    );
};

export default Logo;
