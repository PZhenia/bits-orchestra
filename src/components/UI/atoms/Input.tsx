import React from "react"

interface InputProps {
    className?: string;
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type: "text" | "url";
    name?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type, name, className }) => {
    return (
        <input
            className={`
                w-full px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base
                border border-gray-300 bg-white text-gray-900
                hover:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:border-violet-800
                transition-colors
                ${className || ""}
            `}
            value={value}
            type={type}
            onChange={e => onChange?.(e.target.value)}
            placeholder={placeholder}
            name={name}
        />
    )
}

export default Input