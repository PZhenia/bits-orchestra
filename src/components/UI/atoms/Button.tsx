import React from "react"

interface ButtonProps {
    className?: string;
    onClick: () => void;
    text: string;
    icon?: React.ReactNode;
    variant: "add" | "edit" | "delete";
}

const variantStyles =  {
    add: "bg-violet-800 text-white hover:bg-violet-900",
    edit: "bg-indigo-800 text-white hover:bg-indigo-900",
    delete: "bg-pink-800 text-white hover:bg-pink-900",
}

const Button: React.FC<ButtonProps> = ({ onClick, text, icon, variant, className }) => {
    return(
        <button
            onClick={onClick}
            className={`
                flex items-center justify-center px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base
                transition-colors cursor-pointer
                ${variantStyles[variant]}
                ${className || ""}
            `}
        >
            <span className="whitespace-nowrap">{text}</span>
            {icon && <span className="ml-1 sm:ml-2">{icon}</span>}
        </button>
    )
}

export default Button