import React, { useState } from "react";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptCard from "./ReceiptCard";

const Receipts = () => {
    const { receipts, loading } = useReceipt();

    if (loading)
        return (
            <div className="p-8 text-slate-400 animate-pulse">Loading...</div>
        );

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {receipts.map((receipt) => (
                    <ReceiptCard key={receipt.reciept_id} receipt={receipt} />
                ))}
            </div>
        </div>
    );
};

export default Receipts;
