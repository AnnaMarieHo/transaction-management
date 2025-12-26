import React, { useEffect, useState } from "react";
import ReceiptTemplate from "../atoms/ReceiptTemplate";
import { useReceipt } from "../../hooks/useReceipt";
const Receipts = () => {
    const { receipts, loading } = useReceipt();
    // Track which receipt is currently expanded
    const [expandedId, setExpandedId] = useState(null);

    if (loading)
        return (
            <div className="p-5 text-slate-500">Loading transactions...</div>
        );

    if (receipts.length === 0)
        return <div className="p-5 text-slate-400">No receipts on record.</div>;

    return (
        <div className="max-w-xl mx-auto p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-2">
                Transaction History ({receipts.length})
            </h3>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {receipts.map((receipt, index) => (
                    <div
                        key={receipt.reciept_id}
                        className="border-b border-slate-100 last:border-none"
                    >
                        <button
                            onClick={() =>
                                setExpandedId(
                                    expandedId === receipt.reciept_id
                                        ? null
                                        : receipt.reciept_id
                                )
                            }
                            className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                                expandedId === receipt.reciept_id
                                    ? "bg-blue-50/50"
                                    : ""
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-100 p-2 rounded-lg text-slate-500 text-xs font-mono">
                                    #{receipt.reciept_id}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {receipt.sale_date}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {receipt.num_items} items
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">
                                    ${receipt.sale_total}
                                </p>
                                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">
                                    {expandedId === receipt.reciept_id
                                        ? "Close"
                                        : "View Details"}
                                </p>
                            </div>
                        </button>
                        <div
                            className={`transition-all duration-300 overflow-hidden ${
                                expandedId === receipt.reciept_id
                                    ? "max-h-[1000px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="bg-slate-50 p-4 border-t border-slate-100">
                                <ReceiptTemplate {...receipt} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Receipts;
