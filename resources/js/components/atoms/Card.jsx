import React from "react";
import clsx from "clsx";

const Card = ({
    children,
    variant = "default",
    padding = "md",
    className = "",
    onClick,
}) => {
    const paddingClasses = {
        none: "p-0",
        sm: "p-2 sm:p-3",
        md: "p-3 sm:p-4",
        lg: "p-4 sm:p-6",
    };

    const variantClasses = {
        default:
            "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl shadow-sm dark:shadow-none",
        elevated:
            "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-sm dark:shadow-none",
        flat: "bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl",
        bordered:
            "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl",
    };

    return (
        <div
            onClick={onClick}
            className={clsx(
                variantClasses[variant],
                paddingClasses[padding],
                {
                    "cursor-pointer hover:shadow-md transition-shadow": onClick,
                },
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
