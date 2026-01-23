import React from "react";

const Label = ({ children, htmlFor, variant = "default", className = "" }) => {
    const variantClasses = {
        default:
            "text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-widest",
        inline: "text-[10px] sm:text-xs text-slate-600 font-medium",
    };

    return (
        <label
            htmlFor={htmlFor}
            className={`${variantClasses[variant]} ${className}`}
        >
            {children}
        </label>
    );
};

export default Label;
