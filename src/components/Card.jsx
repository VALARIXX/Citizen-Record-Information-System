import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
            {(title || action) && (
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Card;
