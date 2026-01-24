import React, { useState, useEffect, useRef } from "react";
import AddressCollapsed from "../atoms/AddressCollapsed";
import AddressCardButtons from "../atoms/AddressCardButtons";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptDrawer from "../molecules/ReceiptDrawer";
import ReceiptTemplate from "../atoms/ReceiptTemplate";
import ReceiptDrawerButtons from "../atoms/ReceiptDrawerButtons";
import AddressExpanded from "../atoms/AddressExpanded";
import { fetchAddresses, addAddress, deleteAddress, updateAddress, editAddress } from "../../store/slices/addressSlice";
import {useSelector, useDispatch } from "react-redux";





const AddressCard = ({
    addresses,
    isActive,
    isEditing,
    onCardClick,
    onEditToggle,
    // onSave,
    // deleteAddress,
    // updateAddress,
}) => {
    const dispatch = useDispatch();
    
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [viewTransactions, setViewTransactions] = useState(false);
    const [receiptsFilter, setReceiptsFilter] = useState("All");
    const cardRef = useRef(null);

    const { receipts } = useReceipt();

    const activeBuyerReceipts = receipts.filter(
        (receipt) => receipt.b_id === addresses.id
    );

    const activeSellerReceipts = receipts.filter(
        (receipt) => receipt.s_id === addresses.id
    );

    const numberTransactions =
        activeBuyerReceipts.length + activeSellerReceipts.length;

    useEffect(() => {
        // Trigger entrance animation on mount
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Scroll active card into view on mobile
        if (isActive && cardRef.current) {
            // Small delay to let the card expand first
            setTimeout(() => {
                cardRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }, [isActive]);

    const handleDelete = (e) => {
        e.stopPropagation();
        setIsDeleting(true);

        // Wait for the animation (300ms) before actually removing address from the data
        setTimeout(() => {
            dispatch(deleteAddress(addresses.id));
        }, 300);
    };

    const handleViewTransactions = () => {
        setViewTransactions(!viewTransactions);
    };

    return (
        <>
            <div
                ref={cardRef}
                className={`w-full relative transition-all duration-500 ease-in-out transform scroll-mt-16
            ${
                !isVisible || isDeleting
                    ? "opacity-0 scale-75 max-h-0 mb-0 overflow-hidden" // Entrance/Exit state
                    : "opacity-100 scale-100 max-h-[1000px] mb-3 sm:mb-4" // Visible state
            }
        `}
            >
                {/* {isActive && (
                    <AddressCardButtons
                        handleDelete={handleDelete}
                        isEditing={isEditing}
                        onEditToggle={onEditToggle}
                        handleViewTransactions={handleViewTransactions}
                        numberTransactions={numberTransactions}
                    />
                )} */}

                <div
                    onClick={onCardClick}
                    className={`group flex flex-col w-full rounded-xl transition-all duration-300 overflow-hidden
                ${
                    isActive
                        ? "scale-100 ring-2 ring-blue-500 shadow-2xl bg-white"
                        : "scale-95 sm:scale-90 border border-slate-200 bg-white shadow-sm hover:border-blue-300"
                } cursor-pointer`}
                >
                    <div
                        className={`h-1.5 w-full transition-colors ${
                            isActive
                                ? "bg-blue-500"
                                : "bg-slate-200 group-hover:bg-blue-200"
                        }`}
                    />

                    <div className="p-2.5 sm:p-3 lg:p-4">
                        {!isActive ? (
                            <AddressCollapsed addresses={addresses} />
                        ) : (
                            <AddressExpanded
                                addresses={addresses}
                                isEditing={isEditing}
                                // updateAddress={updateAddress}
                                // onSave={onSave}
                            />
                        )}
                    </div>
                </div>
            </div>
            <ReceiptDrawer
                isOpen={viewTransactions}
                onClose={() => setViewTransactions(false)}
                title="Transaction Records"
            >
                <ReceiptDrawerButtons
                    onFilterChange={setReceiptsFilter}
                    currentFilter={receiptsFilter}
                />

                <div className="mt-6 space-y-6">
                    {(receiptsFilter === "All" ||
                        receiptsFilter === "Incoming") &&
                        activeBuyerReceipts.map((receipt) => (
                            <ReceiptTemplate
                                key={receipt.reciept_id}
                                variant="buyer"
                                {...receipt}
                            />
                        ))}

                    {(receiptsFilter === "All" ||
                        receiptsFilter === "Outgoing") &&
                        activeSellerReceipts.map((receipt) => (
                            <ReceiptTemplate
                                key={receipt.reciept_id}
                                variant="seller"
                                {...receipt}
                            />
                        ))}

                    {numberTransactions === 0 && (
                        <div className="text-center py-20 text-slate-400">
                            <p>
                                No transaction history found for this address.
                            </p>
                        </div>
                    )}
                </div>
            </ReceiptDrawer>
        </>
    );
};

export default AddressCard;
