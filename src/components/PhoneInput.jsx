import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({ label, value, onChange, error, required, className = "" }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <PhoneInput
                country={"in"}
                value={value}
                onChange={onChange}
                placeholder=""
                containerClass="phone-input-container"
                inputClass="!w-full !h-10 !py-2 !pl-12 !pr-3 !border !border-gray-300 !rounded-lg !text-sm !shadow-sm !focus:ring-2 !focus:ring-red-500 !focus:border-red-500 !transition-all"
                buttonClass="!border-none !bg-transparent !rounded-l-lg hover:!bg-gray-50"
                dropdownClass="!rounded-lg !shadow-xl !border-gray-100 !text-sm"
                searchClass="!bg-gray-50 !border-gray-200"
                enableSearch={true}
                disableSearchIcon={true}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            <style>{`
                .phone-input-container .form-control:focus {
                    border-color: #b91c1c !important;
                    box-shadow: 0 0 0 2px rgba(185, 28, 28, 0.2) !important;
                }
                .phone-input-container .flag-dropdown.open .selected-flag {
                    background: #f9fafb !important;
                }
                .phone-input-container .country-list .country.highlight {
                    background-color: #fef2f2 !important;
                }
                .phone-input-container .country-list .country:hover {
                    background-color: #fef2f2 !important;
                }
            `}</style>
        </div>
    );
};

export default CustomPhoneInput;
