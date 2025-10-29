import React, { useEffect, useState } from "react";
import Addresses from "./address/Addresses";
import Receipts from "./receipt/Receipts";
import AddressForm from "./address/AddressForm";

const App = () => {
    return (
        <div className="w-screen min-h-screen h-auto flex flex-row items-start bg-orange-200 justify-center p-2 sm:p-4 overflow-x-hidden">
            <Addresses></Addresses>
            <AddressForm></AddressForm>
            {/* <Receipts></Receipts> */}
        </div>
    );
};

export default App;
