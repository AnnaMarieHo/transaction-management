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
        default:
            "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700",
        blue: "bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800",
        green: "bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800",
        amber: "bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800",
    };

    const textVariants = {
        default: "text-slate-600 dark:text-slate-400",
        blue: "text-blue-600 dark:text-blue-400",
        green: "text-green-600 dark:text-green-400",
        amber: "text-amber-600 dark:text-amber-400",
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
                    <p className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 truncate">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
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
