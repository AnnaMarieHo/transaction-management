import React from "react";
import Receipts from "./Receipts";
import GlobalStats from "./GlobalStats";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "../molecules/StatCard";
import Label from "../atoms/Label";
import {
    calculateTotalVolume,
    calculateReceiptAverage,
    filterReceiptsByUser,
} from "../../utils/receiptUtils";

const DashboardStats = ({ receipts, addresses, activeId }) => {
    const filteredReceipts = activeId
        ? filterReceiptsByUser(receipts, activeId)
        : [];

    const activePerson = addresses?.find((a) => a.id === activeId);
    const activeName = activePerson
        ? `${activePerson.first_name ?? ""} ${activePerson.last_name}`
        : "";

    const displayReceipts = activeId ? filteredReceipts : receipts;
    const totalVolume = calculateTotalVolume(displayReceipts);
    const avgTransaction = calculateReceiptAverage(displayReceipts);

    return (
        <div className="space-y-6 sm:space-y-8 mx-auto p-3 sm:p-4 lg:p-6">
            <header>
                {activeName && (
                    <Label className="mb-3 sm:mb-4 ml-1 sm:ml-2">
                        {activeName}
                    </Label>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <StatCard
                        title="Total Volume"
                        value={`$${totalVolume.toLocaleString()}`}
                        variant="blue"
                    />
                    <StatCard
                        title="Avg. Transaction"
                        value={`$${avgTransaction.toFixed(2)}`}
                        variant="green"
                    />
                </div>
            </header>

            <div className="flex flex-col space-y-6 sm:space-y-8">
                <AnimatePresence mode="wait">
                    {activeId ? (
                        <React.Fragment key="user-view">
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <Receipts
                                    receipts={receipts}
                                    filteredReceipts={filteredReceipts}
                                    activeId={activeId}
                                    addresses={addresses}
                                    activeName={activeName}
                                />
                            </motion.div>

                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                <GlobalStats
                                    addresses={addresses}
                                    receipts={receipts}
                                    activeName={activeName}
                                />
                            </motion.div>
                        </React.Fragment>
                    ) : (
                        <motion.div
                            key="global-view"
                            layout
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                            }}
                        >
                            <GlobalStats
                                addresses={addresses}
                                receipts={receipts}
                                activeName={activeName}
                                activeId={activeId}
                                filteredReceipts={filteredReceipts}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DashboardStats;
