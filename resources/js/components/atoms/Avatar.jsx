import React from "react";
import clsx from "clsx";

const Avatar = ({ initials, variant = "default", className = "" }) => {
    const variantClasses = {
        default:
            "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600",
        blue: "bg-blue-100 text-blue-600",
        white: "bg-white border border-slate-200 text-slate-600",
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
