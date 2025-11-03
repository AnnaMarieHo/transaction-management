import React, { useEffect } from "react";
import { useAddress } from "../../hooks/useAddress";
import AddressCard from "./AddressCard";

const Addresses = () => {
    const { addresses } = useAddress();

    useEffect(() => {});

    return (
        <div className="flex-col flex w-full max-w-md shadow-2xl shadow-black/20 rounded-md bg-orange-100 content-center px-4 ml-4">
            {addresses.map((addresses) => {
                return (
                    <>
                        <AddressCard addresses={addresses} key={addresses.id} />
                    </>
                );
            })}
        </div>
    );
};

export default Addresses;
