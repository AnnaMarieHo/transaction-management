import React from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReceiptDrawerButtons from "../atoms/ReceiptDrawerButtons";

const ReceiptDrawer = ({ isOpen, onClose, children, title }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                            {children}
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-white">
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold uppercase text-sm tracking-widest"
                            >
                                Close Details
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ReceiptDrawer;
