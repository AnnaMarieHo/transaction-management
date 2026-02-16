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
        default: "text-slate-400 dark:text-slate-500 rounded-full",
        blue: "text-blue-600 dark:text-blue-400 rounded-full",
        red: "text-red-600 dark:text-red-400 rounded-full",
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
