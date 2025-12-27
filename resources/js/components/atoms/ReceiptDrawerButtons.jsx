import React from "react";

const ReceiptDrawerButtons = ({ onFilterChange, currentFilter }) => {
    const baseStyle =
        "flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-wider";

    return (
        <div className="p-4 border-b border-slate-100 flex gap-2">
            <button
                onClick={() => onFilterChange("All")}
                className={`${baseStyle} ${
                    currentFilter === "All"
                        ? "bg-slate-500 text-white border-slate-500"
                        : "bg-white text-slate-600 border-slate-100"
                }`}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange("Incoming")}
                className={`${baseStyle} ${
                    currentFilter === "Incoming"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-100"
                }`}
            >
                Incoming
            </button>
            <button
                onClick={() => onFilterChange("Outgoing")}
                className={`${baseStyle} ${
                    currentFilter === "Outgoing"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-slate-600 border-slate-100"
                }`}
            >
                Outgoing
            </button>
        </div>
    );
};
export default ReceiptDrawerButtons;
