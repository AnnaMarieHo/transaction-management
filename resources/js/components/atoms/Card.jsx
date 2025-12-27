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
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
    };

    const variantClasses = {
        default: "bg-white border border-slate-200 rounded-2xl shadow-sm",
        elevated: "bg-white border border-slate-100 rounded-3xl shadow-sm",
        flat: "bg-slate-50 border border-slate-100 rounded-2xl",
        bordered: "bg-white border border-slate-200 rounded-xl",
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
