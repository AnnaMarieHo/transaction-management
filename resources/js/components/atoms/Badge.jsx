import React from "react";
import clsx from "clsx";

const Badge = ({
    children,
    variant = "default",
    size = "md",
    className = "",
}) => {
    const sizeClasses = {
        sm: "px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px]",
        md: "px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs",
        lg: "px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm",
    };

    const variantClasses = {
        default: "bg-slate-100 text-slate-600",
        blue: "bg-blue-50 text-blue-600 border border-blue-100",
        green: "bg-green-50 text-green-600",
        amber: "bg-amber-50 text-amber-600",
        red: "bg-red-50 text-red-600",
    };

    return (
        <span
            className={clsx(
                "inline-flex items-center font-bold uppercase tracking-wider rounded-full",
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
