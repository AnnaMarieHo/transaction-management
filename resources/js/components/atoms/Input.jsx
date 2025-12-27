import React from "react";
import clsx from "clsx";

const Input = ({
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
    className = "",
    variant = "default",
}) => {
    const variantClasses = {
        default:
            "bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400",
        minimal:
            "bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        transparent: "bg-transparent border border-transparent cursor-default",
    };

    return (
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
                "w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg outline-none transition-all text-slate-700 placeholder:text-slate-400",
                variantClasses[variant],
                {
                    "opacity-60 cursor-not-allowed": disabled,
                },
                className
            )}
        />
    );
};

export default Input;
