import React from "react";
import Card from "../atoms/Card";
import Label from "../atoms/Label";
import Badge from "../atoms/Badge";
import TopListCard from "../molecules/TopListCard";
import MarketReachCard from "../molecules/MarketReachCard";
import {
    calculateTotalVolume,
    calculateTopSpenders,
    calculateMostActive,
    calculateCityVolume,
    getTopMarkets,
    filterReceiptsByUser,
} from "../../utils/receiptUtils";

const GlobalStats = ({ addresses, receipts, activeId }) => {
    const isClientView = !!activeId;
    const activeClient = addresses.find((a) => a.id === activeId);

    const relevantReceipts = isClientView
        ? filterReceiptsByUser(receipts, activeId)
        : receipts;

    const totalVolume = calculateTotalVolume(relevantReceipts);
    const topSpenders = calculateTopSpenders(addresses, relevantReceipts, 3);
    const mostActive = calculateMostActive(addresses, relevantReceipts, 3);
    const cityVolume = calculateCityVolume(relevantReceipts);
    const topMarkets = getTopMarkets(cityVolume, totalVolume, 3);

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
                    <Badge variant="blue" size="sm">
                        Client Filter Active
                    </Badge>
                )}
            </div>

            <Card variant="elevated" padding="lg">
                <div className="mb-6">
                    <Label className="mb-1">
                        {isClientView ? "Activity Trend" : "Revenue Momentum"}
                    </Label>
                    <p className="text-3xl font-black text-slate-900">
                        ${totalVolume.toLocaleString()}
                    </p>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TopListCard
                    title="Top Spenders"
                    items={topSpenders}
                    renderItem={(user, i) => (
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
                    )}
                />

                <TopListCard
                    title="Most Active"
                    items={mostActive}
                    renderItem={(user, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-slate-700">
                                    {user.name}
                                </span>
                                <Badge variant="blue" size="sm">
                                    {user.count} Trans.
                                </Badge>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                                Value: ${user.value.toLocaleString()}
                            </p>
                        </div>
                    )}
                />

                <Card
                    variant="elevated"
                    padding="md"
                    className="col-span-1 md:col-span-2"
                >
                    <Label className="mb-4">Market Reach</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {topMarkets.map((market, i) => (
                            <MarketReachCard key={i} market={market} />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default GlobalStats;
