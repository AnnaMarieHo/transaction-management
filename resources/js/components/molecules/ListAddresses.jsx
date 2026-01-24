import React from "react";
import AddressCard from "../organisms/AddressCard";
import { useSelector } from "react-redux";

const ListAddresses = () => {
    const { addresses } = useSelector((state) => state.addresses);

    return (
        <>
            <div className="bg-slate-50 min-h-screen py-12 px-4">
                <div className="flex-col flex w-full max-w-lg mx-auto space-y-8">
                    <div className="px-2">
                        <h2 className="text-2xl font-bold text-slate-800">
                            All Clients
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Select a client to edit or manage details.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                addressId={address.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ListAddresses;
