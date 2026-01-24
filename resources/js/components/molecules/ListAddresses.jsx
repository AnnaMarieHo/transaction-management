import React, { act, useEffect, useState } from "react";
import AddressCard from "../organisms/AddressCard";
import { useSelector } from "react-redux";

const ListAddresses = (props) => {
    // const {addresses} = useSelector((state) => state.addresses)
    const {
        addresses,
        setActiveId,
        activeId,
        onEditingChange,
    } = props;
    // const [activeId, setActiveId] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const handleSetActive = (id) => {
        if (editingId !== null) return;
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    const handleEditToggle = (id) => {
        setEditingId((prev) => {
            const newEditingId = prev === id ? null : id;
            // Notify parent of editing state change
            onEditingChange?.(newEditingId !== null);
            return newEditingId;
        });
    };

    // const handleSave = async (addressData) => {
    //     await editAddress(addressData);
    //     setEditingId(null);
    //     // Notify parent editing has ended
    //     onEditingChange?.(false);
    // };

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
                                addresses={address}
                                isActive={address.id === activeId}
                                activeId={activeId}
                                isEditing={address.id === editingId}
                                onCardClick={() => handleSetActive(address.id)}
                                onEditToggle={() =>
                                    handleEditToggle(address.id)
                                }
                                // onSave={handleSave}
                                // deleteAddress={deleteAddress}
                                // updateAddress={updateAddress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ListAddresses;
