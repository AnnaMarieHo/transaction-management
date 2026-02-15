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
            "text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 rounded-full transition-colors",
        blue: "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-full transition-colors",
        red: "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 rounded-full transition-colors",
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
