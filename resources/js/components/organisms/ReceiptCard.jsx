import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaReceipt } from "react-icons/fa";
import ReceiptTemplate from "../atoms/ReceiptTemplate";

const ReceiptCard = ({ receipt, variant }) => {
    console.log(variant);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-fit">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-slate-50/80 transition-all"
            >
                <div className="flex items-center gap-2 sm:gap-4">
                    <div
                        className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
                            isExpanded
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500"
                        }`}
                    >
                        <FaReceipt className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {receipt.seller_name}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium truncate">
                            #{receipt.reciept_id} • {receipt.num_items} items •{" "}
                            <span
                                className={
                                    variant === "buyer"
                                        ? "text-red-500"
                                        : "text-green-600"
                                }
                            >
                                {variant === "buyer"
                                    ? "Bought from"
                                    : "Sold to " + receipt.buyer_name}
                            </span>
                        </p>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-slate-300 flex-shrink-0"
                >
                    <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100">
                            <ReceiptTemplate {...receipt} variant={variant} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReceiptCard;
