import React from "react";
import Badge from "../atoms/Badge";

const TransactionItem = ({
    receiptId,
    amount,
    isBuying,
    percentDiff,
    isAboveAverage,
    className = "",
}) => {
    return (
        <div
            className={`p-2 sm:p-2.5 lg:p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg sm:rounded-xl flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 shadow-sm dark:shadow-none ${className}`}
        >
            <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span
                    className={`font-black text-base sm:text-lg lg:text-xl ${
                        isBuying
                            ? "text-red-500 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                    }`}
                >
                    {isBuying ? "-" : "+"}${amount.toLocaleString()}
                </span>
                <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-slate-400 dark:text-slate-500">
                    #{receiptId}
                </span>
            </div>

            <div
                className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[8px] sm:text-[9px] lg:text-[10px] font-bold flex-shrink-0 ${
                    isAboveAverage
                        ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                }`}
            >
                <span className="sm:hidden">
                    {isAboveAverage ? "▲" : "▼"}
                    {percentDiff}%
                </span>
                <span className="hidden sm:inline">
                    {isAboveAverage ? "▲" : "▼"} {percentDiff}%{" "}
                    {isAboveAverage ? "Above" : "Below"}
                    <span className="hidden lg:inline"> Avg</span>
                </span>
            </div>
        </div>
    );
};

export default TransactionItem;
