import React from "react";
import clsx from "clsx";

const Avatar = ({ initials, variant = "default", className = "" }) => {
    const variantClasses = {
        default:
            "bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 dark:group-hover:text-blue-400",
        blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
        white: "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300",
    };

    return (
        <div
            className={clsx(
                "h-12 w-12 sm:h-15 sm:w-15 text-sm sm:text-base shrink-0 rounded-full flex items-center justify-center font-bold transition-colors",
                variantClasses[variant],
                className
            )}
        >
            {initials?.toUpperCase() || "?"}
        </div>
    );
};

export default Avatar;
