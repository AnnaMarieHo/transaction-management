import React from "react";
import ReceiptCard from "./ReceiptCard";
import Card from "../atoms/Card";
import Label from "../atoms/Label";
import PartnerCard from "../molecules/PartnerCard";
import { useSelector } from "react-redux";
import {
    selectReceiptsLoading,
    selectFilteredReceipts,
} from "../../store/selectors";

const Receipts = ({ activeId, activeName }) => {
    // Using memoized selectors and backend data
    const loading = useSelector(selectReceiptsLoading);
    const filteredReceipts = useSelector(selectFilteredReceipts);
    const topPartners = useSelector((state) => state.stats.partners.list);
    const partnersLoading = useSelector(
        (state) => state.stats.partners.loading
    );

    if (loading) {
        return (
            <div className="p-8 text-slate-400 dark:text-slate-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-4 border-b border-slate-300 dark:border-slate-600">
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
                {partnersLoading ? (
                    <div className="text-slate-400 dark:text-slate-500 text-sm ">
                        Loading partners...
                    </div>
                ) : (
                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                        {topPartners.map((partner, index) => (
                            <PartnerCard
                                key={partner.id}
                                partner={partner}
                                rank={index + 1}
                            />
                        ))}
                    </div>
                )}
            </Card>

            {/* <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
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
            </div> */}
        </div>
    );
};

export default React.memo(Receipts);
