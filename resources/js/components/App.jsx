import React, { useEffect, useState } from "react";
import AddressPage from "./organisms/Addresses";

const App = () => {
    return (
        <div className="w-screen min-h-screen h-auto flex flex-row items-start bg-orange-200 justify-center p-2 sm:p-4 overflow-x-hidden">
            <AddressPage></AddressPage>
            {/* <Receipts></Receipts> */}
        </div>
    );
};

export default App;
