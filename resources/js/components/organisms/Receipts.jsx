import React, { useState } from "react";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptCard from "./ReceiptCard";

const Receipts = ({ activeId }) => {
    const { receipts, loading } = useReceipt();

    const filteredReceipts = receipts.filter(
        (receipt) => receipt.b_id === activeId || receipt.s_id === activeId
    );

    if (loading)
        return (
            <div className="p-8 text-slate-400 animate-pulse">Loading...</div>
        );

    return (
        <div className="max-w-7xl mx-auto p-4 border-b border-slate-300">
            {filteredReceipts.length > 0 && (
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">
                    Transactions
                </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {filteredReceipts.length > 0 ? (
                    filteredReceipts.map((receipt) => {
                        const variant =
                            receipt.b_id === activeId ? "buyer" : "seller";
                        return (
                            <ReceiptCard
                                key={receipt.reciept_id}
                                receipt={receipt}
                                variant={variant}
                            />
                        );
                    })
                ) : (
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">
                        No Transactions
                    </h3>
                )}
            </div>
        </div>
    );
};

export default Receipts;
