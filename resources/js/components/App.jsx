import React, { useEffect, useState } from "react";
import ListAddresses from "./organisms/ListAddresses";
import Receipts from "./organisms/Receipts";
import { useAddress } from "../hooks/useAddress";
import AddressForm from "./organisms/AddressForm";
import ReceiptForm from "./organisms/ReceiptForm";

const App = () => {
    const { addresses, editAddress, deleteAddress, updateAddress, addAddress } =
        useAddress();

    return (
        <div className="w-screen min-h-screen h-auto flex flex-row items-start justify-center p-2 ">
            <ListAddresses
                addresses={addresses}
                editAddress={editAddress}
                deleteAddress={deleteAddress}
                updateAddress={updateAddress}
                addAddress={addAddress}
            ></ListAddresses>
            <div className="flex flex-col">
                <AddressForm addAddress={addAddress}></AddressForm>
                {/* <ReceiptForm addAddress={addAddress}></ReceiptForm> */}
            </div>

            <Receipts></Receipts>
        </div>
    );
};

export default App;
