import React from "react";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptCard from "./ReceiptCard";
import Card from "../atoms/Card";
import Label from "../atoms/Label";
import PartnerCard from "../molecules/PartnerCard";
import TransactionItem from "../molecules/TransactionItem";
import {
    calculateReceiptAverage,
    calculatePercentDiff,
    buildPartnerInteractionData,
    getTopPartners,
} from "../../utils/receiptUtils";

const Receipts = ({ activeId, activeName, addresses, filteredReceipts }) => {
    const { loading } = useReceipt();

    if (loading)
        return (
            <div className="p-8 text-slate-400 animate-pulse">Loading...</div>
        );

    const userAverage = calculateReceiptAverage(filteredReceipts);

    const interactionData = buildPartnerInteractionData(
        filteredReceipts,
        activeId,
        addresses
    );

    const topPartners = getTopPartners(interactionData, 3);

    return (
        <div className="w-full max-w-7xl mx-auto py-4 border-b border-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start mb-6 sm:mb-8">
                {filteredReceipts.map((receipt) => (
                    <ReceiptCard
                        key={receipt.reciept_id}
                        receipt={receipt}
                        variant={receipt.b_id === activeId ? "buyer" : "seller"}
                    />
                ))}
            </div>

            <Card
                variant="elevated"
                padding="md"
                className="mb-4 sm:mb-6 lg:mb-8"
            >
                <Label className="mb-2 sm:mb-3 lg:mb-4">
                    <span className="sm:hidden">
                        Top Partners - {activeName}
                    </span>
                    <span className="hidden sm:inline">
                        Top Trading Partners for {activeName}
                    </span>
                </Label>
                <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    {topPartners.map((partner, i) => (
                        <PartnerCard key={i} partner={partner} rank={i + 1} />
                    ))}
                </div>
            </Card>

            <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
                {filteredReceipts.slice(0, 5).map((r) => {
                    const isBuying = r.b_id === activeId;
                    const isAboveAverage = r.sale_total > userAverage;
                    const percentDiff = calculatePercentDiff(
                        r.sale_total,
                        userAverage
                    );

                    return (
                        <TransactionItem
                            key={r.reciept_id}
                            receiptId={r.reciept_id}
                            amount={r.sale_total}
                            isBuying={isBuying}
                            percentDiff={percentDiff}
                            isAboveAverage={isAboveAverage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Receipts;
