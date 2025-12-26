import React from "react";

const ReceiptDrawerButtons = () => {
    return (
        <div className="border-b border-slate-100 flex items-center justify-left">
            <button
                onClick={() => {}}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-100 text-blue-600 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
                <span className="text-xs font-semibold uppercase tracking-wider">
                    Incoming
                </span>
            </button>
            <button
                onClick={() => {}}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-green-100 text-green-600 rounded-full shadow-lg hover:bg-green-50 transition-colors"
            >
                <span className="text-xs font-semibold uppercase tracking-wider">
                    Outgoing
                </span>
            </button>
            <button
                onClick={() => {}}
                className="flex items-center gap-2 px-8 py-2 bg-white border border-yellow-100 text-yellow-600 rounded-full shadow-lg hover:bg-yellow-50 transition-colors"
            >
                <span className="text-xs font-semibold uppercase tracking-wider">
                    All
                </span>
            </button>
        </div>
    );
};
export default ReceiptDrawerButtons;
