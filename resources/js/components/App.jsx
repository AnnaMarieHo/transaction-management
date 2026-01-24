import React, { useEffect, useState } from "react";
import ListAddresses from "./molecules/ListAddresses";
import AddressForm from "./organisms/AddressForm";
import ReceiptForm from "./organisms/ReceiptForm";
import { useReceipt } from "../hooks/useReceipt";
import DashboardStats from "./organisms/DashboardStats";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses } from "../store/slices/addressSlice";
import AddressTransactionsDrawer from "./molecules/AddressTransactionsDrawer";
import ResizableClientSidebar from "./organisms/ResizableClientSidebar";


const App = () => {

    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.addresses);
    const { activeId, editingId } = useSelector((state) => state.addresses.ui);
    

    const { receipts } = useReceipt();
    const [showForms, setShowForms] = useState(false);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch])

    return (
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-slate-50">
            <div className="w-full lg:w-7/12 flex flex-col bg-white overflow-y-auto custom-scrollbar pb-[40vh] lg:pb-0">
                <div className="lg:hidden p-2 border-b border-slate-100">
                    <button
                        onClick={() => setShowForms(!showForms)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <span className="text-sm font-bold text-slate-700">
                            {showForms
                                ? "Hide Forms"
                                : "Add New Client / Receipt"}
                        </span>
                        <svg
                            className={`w-4 h-4 text-slate-400 transition-transform ${
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
                </div>

                <div
                    className={`flex flex-wrap justify-center gap-2 p-2 sm:p-4 border-b border-slate-100 ${
                        showForms ? "flex" : "hidden lg:flex"
                    }`}
                >
                    <div className="flex-1 min-w-[300px] max-w-lg">
                        <AddressForm/>
                    </div>
                    <div className="flex-1 min-w-[300px] max-w-lg">
                        <ReceiptForm addReceipt={() => {}} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/20 custom-scrollbar">
                    <DashboardStats
                        activeId={activeId}
                        receipts={receipts}
                        addresses={addresses}
                    />
                </div>
            </div>

            <ResizableClientSidebar>
                <ListAddresses />
            </ResizableClientSidebar>
            <AddressTransactionsDrawer />
        </div>
    );
};

export default App;
