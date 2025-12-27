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
        sm: "px-3 py-1.5 text-[10px]",
        md: "px-4 py-2 text-xs",
        lg: "px-6 py-3 text-sm",
    };

    const variantClasses = {
        blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-[0.98]",
        gray: "bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-[0.98]",
        red: "bg-white border border-red-100 text-red-600 hover:bg-red-50 shadow-lg",
        amber: "bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50 shadow-lg",
        "blue-outline":
            "bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 shadow-lg",
        green: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md active:scale-[0.98]",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
        dark: "bg-slate-800 text-white hover:bg-slate-900 active:scale-[0.98]",
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
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
};

export default Button;
