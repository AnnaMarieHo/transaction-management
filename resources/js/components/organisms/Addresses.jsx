import React from "react";
import AddressList from "./AddressList";
import AddressForm from "../molecules/AddressForm";
import { useAddress } from "../../hooks/useAddress";

const Addresses = () => {
    const { addAddress, addresses, editAddress } = useAddress();

    return (
        <div className="w-screen min-h-screen h-auto flex flex-row items-start bg-orange-200 justify-center p-2 sm:p-4 overflow-x-hidden">
            <AddressList
                addresses={addresses}
                editAddress={editAddress}
            ></AddressList>
            <AddressForm addAddress={addAddress}></AddressForm>
        </div>
    );
};
export default Addresses;
