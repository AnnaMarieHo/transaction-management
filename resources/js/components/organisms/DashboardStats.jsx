import React from "react";
import Receipts from "./Receipts";
import GlobalStats from "./GlobalStats";
import { motion, AnimatePresence } from "framer-motion";

const DashboardStats = ({ receipts, addresses, activeId }) => {
    const filteredReceipts = receipts.filter(
        (receipt) => receipt.b_id === activeId || receipt.s_id === activeId
    );

    const activePerson = addresses?.find((a) => a.id === activeId);
    const activeName = activePerson
        ? `${activePerson.first_name ?? ""} ${activePerson.last_name}`
        : "";

    return (
        <div className="space-y-8 mx-auto p-6">
            <header>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">
                    {activeName ? activeName : ""}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs font-bold text-blue-600 uppercase">
                            Total Volume
                        </p>
                        <p className="text-2xl font-black text-slate-800">
                            $
                            {(activeId ? filteredReceipts : receipts)
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
                            {(activeId
                                ? filteredReceipts.reduce(
                                      (sum, r) => sum + r.sale_total,
                                      0
                                  ) / filteredReceipts.length || 0
                                : receipts.reduce(
                                      (sum, r) => sum + r.sale_total,
                                      0
                                  ) / receipts.length || 0
                            ).toFixed(2)}
                        </p>
                    </div>
                </div>
            </header>

            <div className="flex flex-col space-y-8">
                <AnimatePresence mode="popLayout">
                    {activeId ? (
                        <React.Fragment key="user-view">
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Receipts
                                    receipts={receipts}
                                    filteredReceipts={filteredReceipts}
                                    activeId={activeId}
                                    addresses={addresses}
                                    activeName={activeName}
                                />
                            </motion.div>

                            <motion.div layout>
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 100,
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
