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
            className={`p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between shadow-sm ${className}`}
        >
            <div className="flex flex-col">
                <span
                    className={`font-bold ${
                        isBuying ? "text-red-500" : "text-green-600"
                    }`}
                >
                    {isBuying ? "-" : "+"}${amount.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">#{receiptId}</span>
            </div>

            <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                    isAboveAverage
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                }`}
            >
                {isAboveAverage ? "▲" : "▼"}
                <span>
                    transaction was {percentDiff}%{" "}
                    {isAboveAverage ? "Above" : "Below"} Avg
                </span>
            </div>
        </div>
    );
};

export default TransactionItem;
