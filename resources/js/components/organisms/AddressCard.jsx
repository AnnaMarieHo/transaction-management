import React from "react";
import PersonalInformation from "../molecules/PersonalInformation";
import CompanyInformation from "../molecules/CompanyInformation";
import AddressCardButtons from "../atoms/AddressCardButtons";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptDrawer from "../molecules/ReceiptDrawer";
import ReceiptTemplate from "../atoms/ReceiptTemplate";
import ReceiptDrawerButtons from "../atoms/ReceiptDrawerButtons";
const AddressCard = ({
    addresses,
    isActive,
    isEditing,
    onCardClick,
    onEditToggle,
    onSave,
    deleteAddress,
    updateAddress,
}) => {
    // Logic for initials avatar
    const initials = `${addresses.first_name?.[0] || ""}${
        addresses.last_name?.[0] || ""
    }`;
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [viewTransactions, setViewTransactions] = React.useState(false);

    const { receipts } = useReceipt();

    const activeBuyerReceipts = receipts.filter(
        (receipt) => receipt.b_id === addresses.id
    );

    const activeSellerReceipts = receipts.filter(
        (receipt) => receipt.s_id === addresses.id
    );

    const numberTransactions =
        activeBuyerReceipts.length + activeSellerReceipts.length;

    React.useEffect(() => {
        // Trigger entrance animation on mount
        setIsVisible(true);
    }, []);

    const handleDelete = (e) => {
        e.stopPropagation();
        setIsDeleting(true);

        // Wait for the animation (300ms) before actually removing address from the data
        setTimeout(() => {
            deleteAddress(addresses.id);
        }, 300);
    };

    const handleViewTransactions = () => {
        setViewTransactions(!viewTransactions);
    };

    return (
        <>
            <div
                className={`w-full relative transition-all duration-500 ease-in-out transform
            ${
                !isVisible || isDeleting
                    ? "opacity-0 scale-75 max-h-0 mb-0 overflow-hidden" // Entrance/Exit state
                    : "opacity-100 scale-100 max-h-[1000px] mb-4" // Visible state
            }
        `}
            >
                {isActive && (
                    <AddressCardButtons
                        handleDelete={handleDelete}
                        isEditing={isEditing}
                        onEditToggle={onEditToggle}
                        handleViewTransactions={handleViewTransactions}
                        numberTransactions={numberTransactions}
                    />
                )}

                <div
                    onClick={onCardClick}
                    className={`group flex flex-col w-full rounded-xl transition-all duration-300 overflow-hidden
                ${
                    isActive
                        ? "scale-[1.00] ring-2 ring-blue-500 shadow-2xl bg-white"
                        : "scale-90 border border-slate-200 bg-white shadow-sm hover:border-blue-300"
                } cursor-pointer`}
                >
                    <div
                        className={`h-1.5 w-full transition-colors ${
                            isActive
                                ? "bg-blue-500"
                                : "bg-slate-200 group-hover:bg-blue-200"
                        }`}
                    />

                    <div className="p-4">
                        {!isActive ? (
                            <div className="flex items-center gap-4 animate-in fade-in duration-300">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    {initials.toUpperCase() || "AD"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                                        {addresses.first_name}{" "}
                                        {addresses.last_name}
                                        <span className="ml-2 font-normal text-slate-400">
                                            {addresses.company &&
                                                `• ${addresses.company}`}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-slate-500 truncate">
                                        {addresses.address_line1},{" "}
                                        {addresses.city}
                                    </p>
                                </div>
                                <div className="text-slate-300 group-hover:text-blue-400 transition-colors px-2">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
                                <PersonalInformation
                                    {...addresses}
                                    onFieldChange={(n, v) =>
                                        updateAddress(addresses.id, n, v)
                                    }
                                    edit={isEditing}
                                />

                                <div className="h-[1px] w-full bg-slate-100" />

                                <CompanyInformation
                                    {...addresses}
                                    onFieldChange={(n, v) =>
                                        updateAddress(addresses.id, n, v)
                                    }
                                    edit={isEditing}
                                />

                                {isEditing && (
                                    <div className="pt-2 animate-in zoom-in-95 duration-200">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSave(addresses);
                                            }}
                                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all uppercase text-sm tracking-widest"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ReceiptDrawer
                isOpen={viewTransactions}
                onClose={() => setViewTransactions(false)}
                title="Transaction Records"
            >
                <ReceiptDrawerButtons />

                {numberTransactions > 0 ? (
                    <>
                        {activeBuyerReceipts.length > 0 && (
                            <div className="space-y-6">
                                {activeBuyerReceipts.map((receipt) => (
                                    <ReceiptTemplate
                                        key={receipt.reciept_id}
                                        variant="buyer"
                                        {...receipt}
                                    />
                                ))}
                            </div>
                        )}

                        {activeSellerReceipts.length > 0 && (
                            <div className="space-y-6">
                                {activeSellerReceipts.map((receipt) => (
                                    <ReceiptTemplate
                                        variant="seller"
                                        key={receipt.reciept_id}
                                        {...receipt}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 text-slate-400">
                        <p>No transaction history found for this address.</p>
                    </div>
                )}
            </ReceiptDrawer>
        </>
    );
};

export default AddressCard;
