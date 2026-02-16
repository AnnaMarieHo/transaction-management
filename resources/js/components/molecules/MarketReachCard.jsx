import React from "react";

const MarketReachCard = ({ market, className = "" }) => {
    const { name, total, share } = market;

    return (
        <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
            <div className="flex justify-between items-end">
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize truncate">
                    {name}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-slate-100 ml-2">
                    {share}%
                </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1 sm:h-1.5 rounded-full overflow-hidden">
                <div
                    className="bg-blue-500 dark:bg-blue-500 h-full"
                    style={{ width: `${share}%` }}
                />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500">
                ${total.toLocaleString()}
            </p>
        </div>
    );
};

export default MarketReachCard;
