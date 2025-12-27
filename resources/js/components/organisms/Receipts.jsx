import React, { useState } from "react";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptCard from "./ReceiptCard";

const Receipts = ({ activeId, activeName, addresses, filteredReceipts }) => {
    const { loading } = useReceipt();

    if (loading)
        return (
            <div className="p-8 text-slate-400 animate-pulse">Loading...</div>
        );

    const userAverage =
        filteredReceipts.length > 0
            ? filteredReceipts.reduce((sum, r) => sum + r.sale_total, 0) /
              filteredReceipts.length
            : 0;

    const interactionData = filteredReceipts.reduce((acc, r) => {
        const isBuying = r.b_id === activeId;
        const partnerId = isBuying ? r.s_id : r.b_id;
        const partnerName = isBuying ? r.seller_name : r.buyer_name;

        const partnerObj = addresses?.find((a) => a.id === partnerId);
        const companyName = partnerObj?.company;

        if (!acc[partnerId]) {
            acc[partnerId] = {
                name: partnerName,
                company: companyName,
                buys: 0,
                sells: 0,
                totalValue: 0,
            };
        }

        acc[partnerId].totalValue += r.sale_total;
        if (isBuying) acc[partnerId].buys += 1;
        else acc[partnerId].sells += 1;

        return acc;
    }, {});

    const topPartners = Object.values(interactionData)
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto py-4 border-b border-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mb-8">
                {filteredReceipts.map((receipt) => (
                    <ReceiptCard
                        key={receipt.reciept_id}
                        receipt={receipt}
                        variant={receipt.b_id === activeId ? "buyer" : "seller"}
                    />
                ))}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Top Trading Partners for {activeName}
                </h3>
                <div className="space-y-3">
                    {topPartners.map((partner, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                    {partner.name?.charAt(0)}
                                </div>
                                <div>
                                    {partner.company && (
                                        <p className="text-[10px] font-bold text-blue-500 uppercase">
                                            {partner.company}
                                        </p>
                                    )}
                                    <p className="text-sm font-black text-slate-800">
                                        {partner.name}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-slate-900">
                                    ${partner.totalValue.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                {filteredReceipts.slice(0, 5).map((r) => {
                    const isBuying = r.b_id === activeId;
                    const isAboveAverage = r.sale_total > userAverage;

                    const rawDiff =
                        userAverage > 0
                            ? ((r.sale_total - userAverage) / userAverage) * 100
                            : 0;
                    const normalizedDiff = Math.min(
                        Math.abs(rawDiff),
                        100
                    ).toFixed(0);

                    return (
                        <div
                            key={r.reciept_id}
                            className="p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between shadow-sm"
                        >
                            <div className="flex flex-col">
                                <span
                                    className={`font-bold ${
                                        isBuying
                                            ? "text-red-500"
                                            : "text-green-600"
                                    }`}
                                >
                                    {isBuying ? "-" : "+"}$
                                    {r.sale_total.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    #{r.reciept_id}
                                </span>
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
                                    {"transaction was "}
                                    {normalizedDiff}%{" "}
                                    {isAboveAverage ? "Above" : "Below"} Avg
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Receipts;
