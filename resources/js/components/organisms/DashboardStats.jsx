import React from "react";
import Receipts from "./Receipts";

const DashboardStats = ({ receipts, addresses, activeId }) => {
    const topSpenders = addresses
        .map((addr) => ({
            name: addr.first_name,
            total: receipts
                .filter((r) => r.b_id === addr.id)
                .reduce((sum, r) => sum + r.sale_total, 0),
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

    const topSellers = addresses
        .map((addr) => ({
            name: addr.first_name,
            total: receipts
                .filter((r) => r.s_id === addr.id)
                .reduce((sum, r) => sum + r.sale_total, 0),
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase">
                        Total Volume
                    </p>
                    <p className="text-2xl font-black text-slate-800">
                        $
                        {receipts
                            .reduce((sum, r) => sum + r.sale_total, 0)
                            .toLocaleString()}
                    </p>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                    <p className="text-xs font-bold text-green-600 uppercase">
                        Avg. Transaction
                    </p>
                    <p className="text-2xl font-black text-slate-800">
                        $
                        {(
                            receipts.reduce((sum, r) => sum + r.sale_total, 0) /
                                receipts.length || 0
                        ).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Top Spenders
                    </h3>
                    <div className="space-y-4">
                        {topSpenders.map((user, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center"
                            >
                                <span className="text-sm font-semibold text-slate-700">
                                    {user.name}
                                </span>
                                <span className="text-sm font-bold text-slate-900">
                                    ${user.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Top Sellers
                    </h3>
                    <div className="space-y-4">
                        {topSellers.map((user, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center"
                            >
                                <span className="text-sm font-semibold text-slate-700">
                                    {user.name}
                                </span>
                                <span className="text-sm font-bold text-slate-900">
                                    ${user.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Receipts receipts={receipts} activeId={activeId}></Receipts>

            <div className="">
                <div className="space-y-2">
                    {receipts.slice(0, 5).map((r) => (
                        <div
                            key={r.reciept_id}
                            className="p-3 bg-slate-50 rounded-xl flex justify-between text-xs"
                        >
                            <span className="font-mono text-slate-400">
                                #{r.reciept_id}
                            </span>
                            <span className="font-bold text-slate-700">
                                ${r.sale_total}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default DashboardStats;
