import React, { useState } from "react";
import AddressCard from "./AddressCard";
import { useAddress } from "../../hooks/useAddress";
import AddressForm from "./AddressForm";

const ListAddresses = (props) => {
    const { addresses, editAddress, deleteAddress, updateAddress, addAddress } =
        props;

    const [activeId, setActiveId] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const handleSetActive = (id) => {
        if (editingId !== null) return;
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    const handleEditToggle = (id) => {
        setEditingId((prev) => (prev === id ? null : id));
    };

    const handleSave = async (addressData) => {
        await editAddress(addressData);
        setEditingId(null);
    };

    return (
        <>
            <div className="bg-slate-50 min-h-screen py-12 px-4">
                <div className="flex-col flex w-full max-w-lg mx-auto space-y-8">
                    <div className="px-2">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Saved Addresses
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Select an address to edit or manage details.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                addresses={address}
                                isActive={address.id === activeId}
                                isEditing={address.id === editingId}
                                onCardClick={() => handleSetActive(address.id)}
                                onEditToggle={() =>
                                    handleEditToggle(address.id)
                                }
                                onSave={handleSave}
                                deleteAddress={deleteAddress}
                                updateAddress={updateAddress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ListAddresses;
