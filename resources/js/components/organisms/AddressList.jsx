import React, { useEffect } from "react";
import AddressCard from "./AddressCard";

const Addresses = ({ addresses, editAddress, deleteAddress }) => {
    return (
        <div className="flex-col flex w-full max-w-md shadow-2xl shadow-black/20 rounded-md border border-slate-300 content-center p-4 ml-4">
            {addresses.map((addresses) => {
                return (
                    <>
                        <AddressCard
                            deleteAddress={deleteAddress}
                            addresses={addresses}
                            editAddress={editAddress}
                            key={addresses.id}
                        />
                    </>
                );
            })}
        </div>
    );
};

export default Addresses;
