import React, { useEffect, useState } from "react";
import ListAddresses from "./molecules/ListAddresses";
import { useAddress } from "../hooks/useAddress";
import AddressForm from "./organisms/AddressForm";
import ReceiptForm from "./organisms/ReceiptForm";
import { useReceipt } from "../hooks/useReceipt";
import DashboardStats from "./organisms/DashboardStats";

const App = () => {
    const { addresses, addAddress, editAddress, deleteAddress, updateAddress } =
        useAddress();
    const { receipts } = useReceipt();

    const [activeId, setActiveId] = useState(null);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <div className="w-7/12 flex flex-col bg-white overflow-y-auto custom-scrollbar">
                <div className=" flex flex-row p-2 justify-center border-b border-slate-100">
                    <div>
                        <AddressForm addAddress={addAddress} />
                    </div>
                    <div>
                        <ReceiptForm addAddress={() => {}} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/20 custom-scrollbar">
                    <DashboardStats
                        activeId={activeId}
                        receipts={receipts}
                        addresses={addresses}
                    />
                </div>
            </div>
            <div className="w-5/12 overflow-y-auto border-r border-slate-200 p-6 custom-scrollbar">
                <ListAddresses
                    addresses={addresses}
                    editAddress={editAddress}
                    deleteAddress={deleteAddress}
                    updateAddress={updateAddress}
                    setActiveId={setActiveId}
                    activeId={activeId}
                />
            </div>
        </div>
    );
};

export default App;
