import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-500 shadow-sm",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-red-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        warning: "bg-yellow-500 text-red-900 hover:bg-yellow-400 focus:ring-yellow-500 shadow-sm",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
