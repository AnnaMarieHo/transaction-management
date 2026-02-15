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
        default:
            "bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300",
        blue: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800",
        green: "bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-300",
        amber: "bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300",
        red: "bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300",
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
