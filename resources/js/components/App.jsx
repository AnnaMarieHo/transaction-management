import React, { useEffect, useState } from "react";
import ListAddresses from "./organisms/ListAddresses";
import Receipts from "./organisms/Receipts";

const App = () => {
    return (
        <div className="w-screen min-h-screen h-auto flex flex-row items-start justify-center p-2 ">
            <ListAddresses></ListAddresses>
            {/* <Receipts></Receipts> */}
        </div>
    );
};

export default App;
