import React from "react";

const MarketReachCard = ({ market, className = "" }) => {
    const { name, total, share } = market;

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-slate-700 capitalize">
                    {name}
                </span>
                <span className="text-xs font-bold text-slate-900">
                    {share}%
                </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${share}%` }}
                />
            </div>
            <p className="text-[10px] text-slate-400">
                ${total.toLocaleString()}
            </p>
        </div>
    );
};

export default MarketReachCard;
