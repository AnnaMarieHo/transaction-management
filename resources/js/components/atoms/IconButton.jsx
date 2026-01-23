import React from "react";

const IconButton = ({
    icon: Icon,
    onClick,
    variant = "default",
    size = "md",
    className = "",
    ariaLabel,
}) => {
    const sizeClasses = {
        sm: "p-1 sm:p-1.5",
        md: "p-1.5 sm:p-2",
        lg: "p-2 sm:p-3",
    };

    const variantClasses = {
        default:
            "text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors",
        blue: "text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full transition-colors",
        red: "text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full transition-colors",
    };

    return (
        <button
            onClick={onClick}
            className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            aria-label={ariaLabel}
        >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
    );
};

export default IconButton;
