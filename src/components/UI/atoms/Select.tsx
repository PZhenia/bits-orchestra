import React from "react"

interface SelectOptionsProps {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOptionsProps[];
    onChange: (value: string) => void;
    value: string;
    label?: string;
    placeholder: string;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value, label, placeholder, className }) => {
    return (
        <div className={`flex flex-col gap-1 ${className || ""}`}>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                onChange={(e) => onChange(e.target.value)}
                value={value}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option
                        value={option.value}
                        key={option.value}
                    >
                        {option.label}
                    </option>))}
            </select>
        </div>
    )
}

export default Select