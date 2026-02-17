import React, { useEffect, useState } from "react";
import ListAddresses from "./molecules/ListAddresses";
import AddressForm from "./organisms/AddressForm";
import ReceiptForm from "./organisms/ReceiptForm";
import GlobalStats from "./organisms/GlobalStats";
import { useDispatch } from "react-redux";
import { fetchAddresses } from "../store/slices/addressSlice";
import { fetchReceiptsAsync } from "../store/slices/recieptSlice";
import ResizableClientSidebar from "./organisms/ResizableClientSidebar";
import NightModeToggle from "./atoms/NightModeToggle";
import { fetchGlobalStatsAsync } from "../store/slices/statsSlice";

const App = () => {
    const dispatch = useDispatch();
    const [showForms, setShowForms] = useState(false);

    useEffect(() => {
        dispatch(fetchAddresses());
        dispatch(fetchReceiptsAsync());
        dispatch(fetchGlobalStatsAsync());
    }, [dispatch]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <div className="w-full lg:w-7/12 flex flex-col bg-white dark:bg-slate-800 overflow-y-auto custom-scrollbar pb-[40vh] lg:pb-0 transition-colors">
                <div className="lg:hidden p-2 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowForms(!showForms)}
                            className="flex-1 flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                        >
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                {showForms
                                    ? "Hide Forms"
                                    : "Add New Client / Receipt"}
                            </span>
                            <svg
                                className={`w-4 h-4 text-slate-400 dark:text-slate-400 transition-transform ${
                                    showForms ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <NightModeToggle />
                    </div>
                </div>

                <div
                    className={`flex flex-wrap justify-center gap-2 p-2 sm:p-4 border-b border-slate-100 dark:border-slate-700 ${
                        showForms ? "flex" : "hidden lg:flex"
                    }`}
                >
                    <div className="flex-1 min-w-[300px] max-w-lg">
                        <AddressForm />
                    </div>
                    <div className="flex-1 min-w-[300px] max-w-lg">
                        <ReceiptForm />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/20 dark:bg-slate-900/30 custom-scrollbar transition-colors">
                    <GlobalStats />
                </div>
            </div>

            <ResizableClientSidebar>
                <ListAddresses />
            </ResizableClientSidebar>
        </div>
    );
};

export default App;
