import React, { useEffect, useState } from "react";
import ListAddresses from "./organisms/ListAddresses";
import Receipts from "./organisms/Receipts";
import { useAddress } from "../hooks/useAddress";
import AddressForm from "./organisms/AddressForm";

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
            <AddressForm addAddress={addAddress}></AddressForm>

            <Receipts></Receipts>
        </div>
    );
};

export default App;
