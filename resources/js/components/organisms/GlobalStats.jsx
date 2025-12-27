import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const GlobalStats = ({ addresses, receipts, activeId }) => {
    const isClientView = !!activeId;
    const activeClient = addresses.find((a) => a.id === activeId);

    const relevantReceipts = isClientView
        ? receipts.filter((r) => r.b_id === activeId || r.s_id === activeId)
        : receipts;

    const totalVolume = relevantReceipts.reduce(
        (sum, r) => sum + r.sale_total,
        0
    );

    const topSpenders = addresses
        .map((addr) => {
            const userReceipts = relevantReceipts.filter(
                (r) => r.b_id === addr.id
            );
            const total = userReceipts.reduce(
                (sum, r) => sum + r.sale_total,
                0
            );
            return {
                name: addr.first_name,
                total,
                avg:
                    userReceipts.length > 0
                        ? (total / userReceipts.length).toFixed(0)
                        : 0,
                items: userReceipts.reduce(
                    (sum, r) => sum + (r.num_items || 0),
                    0
                ),
            };
        })
        .filter((user) => user.total > 0)
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

    const mostActive = addresses
        .map((addr) => {
            const count = relevantReceipts.filter(
                (r) => r.b_id === addr.id || r.s_id === addr.id
            ).length;
            const value = relevantReceipts
                .filter((r) => r.b_id === addr.id || r.s_id === addr.id)
                .reduce((sum, r) => sum + r.sale_total, 0);
            return { name: addr.last_name, count, value };
        })
        .filter((user) => user.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    const cityVolume = relevantReceipts.reduce((acc, r) => {
        const city = r.b_city?.replace("_", " ") || "Other";
        acc[city] = (acc[city] || 0) + r.sale_total;
        return acc;
    }, {});

    const topMarkets = Object.entries(cityVolume)
        .map(([name, total]) => ({
            name,
            total,
            share:
                totalVolume > 0 ? ((total / totalVolume) * 100).toFixed(1) : 0,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div>
                    <h2 className="text-xl font-black text-slate-800">
                        {isClientView
                            ? `Insights for ${activeClient?.first_name}`
                            : "Global Dashboard"}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                        {isClientView
                            ? "Viewing filtered partner activity"
                            : "Viewing total network performance"}
                    </p>
                </div>
                {isClientView && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold border border-blue-100">
                        CLIENT FILTER ACTIVE
                    </span>
                )}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {isClientView ? "Activity Trend" : "Revenue Momentum"}
                    </h3>
                    <p className="text-3xl font-black text-slate-900">
                        ${totalVolume.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Top Spenders
                    </h3>
                    <div className="space-y-4">
                        {topSpenders.map((user, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-700">
                                        {user.name}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">
                                        ${user.total.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                    <span>Avg: ${user.avg}</span>
                                    <span>{user.items} items</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Most Active
                    </h3>
                    <div className="space-y-4">
                        {mostActive.map((user, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-700">
                                        {user.name}
                                    </span>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                                        {user.count} Trans.
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1">
                                    Value: ${user.value.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm col-span-1 md:col-span-2">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Market Reach
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {topMarkets.map((market, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-semibold text-slate-700 capitalize">
                                        {market.name}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900">
                                        {market.share}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full transition-all duration-500"
                                        style={{ width: `${market.share}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400">
                                    ${market.total.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalStats;
