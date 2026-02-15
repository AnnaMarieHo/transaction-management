import React from "react";
import clsx from "clsx";

const Button = ({
    children,
    onClick,
    variant = "blue",
    size = "md",
    type = "button",
    disabled = false,
    className = "",
    icon: Icon,
    fullWidth = false,
}) => {
    const sizeClasses = {
        sm: "px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px]",
        md: "px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs",
        lg: "px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm",
    };

    const variantClasses = {
        blue: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md active:scale-[0.98]",
        gray: "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 active:scale-[0.98]",
        red: "bg-white dark:bg-slate-800 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-lg",
        amber: "bg-white dark:bg-slate-800 border border-yellow-100 dark:border-amber-800 text-yellow-600 dark:text-amber-400 hover:bg-yellow-50 dark:hover:bg-amber-900/20 shadow-lg",
        "blue-outline":
            "bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-lg",
        green: "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-md active:scale-[0.98]",
        ghost: "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
        dark: "bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 active:scale-[0.98]",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-300 rounded-full",
                sizeClasses[size],
                variantClasses[variant],
                {
                    "opacity-50 cursor-not-allowed": disabled,
                    "w-full": fullWidth,
                },
                className
            )}
        >
            {Icon && <Icon className="w-3 h-3 sm:w-4 sm:h-4" />}
            {children}
        </button>
    );
};

export default Button;
