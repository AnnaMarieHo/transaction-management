import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "../atoms/IconButton";
import Button from "../atoms/Button";
import { FaTimes } from "react-icons/fa";

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
                        className="relative w-full max-w-full sm:max-w-md bg-white dark:bg-slate-800 h-full shadow-2xl flex flex-col"
                    >
                        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                                {title}
                            </h2>
                            <IconButton
                                icon={FaTimes}
                                onClick={onClose}
                                ariaLabel="Close drawer"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/50">
                            {children}
                        </div>

                        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <Button
                                onClick={onClose}
                                variant="dark"
                                size="lg"
                                fullWidth
                            >
                                Close Details
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ReceiptDrawer;
