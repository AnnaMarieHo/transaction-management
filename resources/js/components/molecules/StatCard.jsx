import React from "react";
import Card from "../atoms/Card";

const StatCard = ({
    title,
    value,
    subtitle,
    variant = "default",
    icon: Icon,
    className = "",
}) => {
    const variantClasses = {
        default: "bg-white border-slate-100",
        blue: "bg-blue-50 border-blue-100",
        green: "bg-green-50 border-green-100",
        amber: "bg-amber-50 border-amber-100",
    };

    const textVariants = {
        default: "text-slate-600",
        blue: "text-blue-600",
        green: "text-green-600",
        amber: "text-amber-600",
    };

    return (
        <Card
            variant="elevated"
            padding="md"
            className={`${variantClasses[variant]} ${className}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <p
                        className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${textVariants[variant]}`}
                    >
                        {title}
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-slate-800 mt-1 truncate">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-1 truncate">
                            {subtitle}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div
                        className={`p-1.5 sm:p-2 rounded-lg ${textVariants[variant]} flex-shrink-0`}
                    >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatCard;
