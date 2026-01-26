import React from 'react';

const COUNTRY_CODES = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
];

const PhoneInput = ({
    label,
    value = '',
    countryCode = '+91',
    onChange,
    onCountryChange,
    placeholder = '9876543210',
    required = false,
    className = ''
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <div className="flex">
                <select
                    value={countryCode}
                    onChange={(e) => onCountryChange && onCountryChange(e.target.value)}
                    className="px-2 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm focus:ring-red-500 focus:border-red-500 min-w-[90px]"
                >
                    {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    pattern="[0-9]{6,14}"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-red-500 focus:border-red-500"
                />
            </div>
        </div>
    );
};

export default PhoneInput;
