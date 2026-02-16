import React, { useEffect, useRef, useState } from "react";
import Avatar from "../atoms/Avatar";
import AddressCardButtons from "../atoms/AddressCardButtons";
import PersonalInformation from "../molecules/PersonalInformation";
import CompanyInformation from "../molecules/CompanyInformation";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";
import AddressTransactionsDrawer from "../molecules/AddressTransactionsDrawer";
import { useSelector, useDispatch } from "react-redux";
import {
    selectAddressById,
    selectReceiptsForAddress,
} from "../../store/selectors";
import { editAddress, deleteAddress } from "../../store/slices/addressSlice";

const AddressCard = ({ addressId }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editBuffer, setEditBuffer] = useState(null); // Buffer for editing
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const address = useSelector((state) => selectAddressById(state, addressId));
    const { numberTransactions } = useSelector((state) =>
        selectReceiptsForAddress(state, addressId),
    );

    const displayData = isEditing ? editBuffer : address;

    useEffect(() => {
        if (isEditing && address) {
            setEditBuffer({ ...address });
        } else {
            setEditBuffer(null);
        }
    }, [isEditing, address]);

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            setTimeout(() => {
                cardRef.current?.scrollIntoView({ block: "start" });
            }, 100);
        }
    }, [isExpanded]);

    const handleToggle = (e) => {
        if (isEditing) return;
        const target = e.target;
        const isInteractive = target.closest(
            'input, button, textarea, select, a, [role="button"]',
        );
        if (isInteractive) return;
        setIsExpanded(!isExpanded);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setIsDeleting(true);
    };

    const handleAnimationEnd = () => {
        if (isDeleting) {
            dispatch(deleteAddress(addressId));
        }
    };

    const handleTransitionEnd = (e) => {
        if (e.propertyName === "opacity" && isDeleting) {
            dispatch(deleteAddress(addressId));
        }
    };

    const handleFieldChange = (name, value) => {
        if (isEditing && editBuffer) {
            setEditBuffer({ ...editBuffer, [name]: value });
        }
    };

    const handleSave = (e) => {
        e.stopPropagation();
        if (editBuffer) {
            dispatch(editAddress(editBuffer)).then(() => {
                setIsEditing(false);
            });
        }
    };

    const handleViewTransactions = (e) => {
        e?.stopPropagation();
        setDrawerOpen(true);
    };

    if (!address) return null;

    const initials = `${address.first_name?.[0] || ""}${address.last_name?.[0] || ""}`;

    return (
        <>
            <div
                ref={cardRef}
                onTransitionEnd={handleTransitionEnd}
                className={`w-full relative scroll-mt-16 transition-all duration-300
                    ${
                        !isVisible || isDeleting
                            ? "opacity-0 scale-75 max-h-0 mb-0 overflow-hidden"
                            : "opacity-100 scale-100 max-h-[1000px] mb-3 sm:mb-4"
                    }`}
            >
                <div
                    onClick={handleToggle}
                    className={`group flex flex-col w-full rounded-xl ${
                        isExpanded ? "overflow-visible" : "overflow-hidden"
                    } ${
                        isExpanded
                            ? "scale-100 ring-2 ring-blue-500 dark:ring-blue-400 shadow-2xl bg-white dark:bg-slate-800"
                            : "scale-95 sm:scale-90 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm"
                    } ${isEditing ? "cursor-default" : "cursor-pointer"}`}
                >
                    {/* Top bar indicator */}
                    <div
                        className={`h-1.5 w-full ${
                            isExpanded
                                ? "bg-blue-500 dark:bg-blue-500"
                                : "bg-slate-200 dark:bg-slate-600"
                        }`}
                    />

                    <div className="p-2.5 sm:p-3 lg:p-4">
                        {/* COLLAPSED VIEW */}
                        {!isExpanded ? (
                            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                                <Avatar
                                    initials={initials}
                                    className="hidden xs:flex sm:flex"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 dark:text-slate-100 truncate">
                                        {address.first_name} {address.last_name}
                                        <span className="ml-1 sm:ml-2 font-normal text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                                            {address.company &&
                                                `• ${address.company}`}
                                        </span>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                                        {address.address_line1}, {address.city}
                                    </p>
                                </div>
                                <div className="text-slate-300 dark:text-slate-500 flex-shrink-0">
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
                            /* EXPANDED VIEW */
                            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                <AddressCardButtons
                                    handleDelete={handleDelete}
                                    isEditing={isEditing}
                                    onEditToggle={() =>
                                        setIsEditing(!isEditing)
                                    }
                                    handleViewTransactions={
                                        handleViewTransactions
                                    }
                                    numberTransactions={numberTransactions}
                                />

                                <PersonalInformation
                                    {...displayData}
                                    onFieldChange={handleFieldChange}
                                    edit={isEditing}
                                />

                                <Divider />

                                <CompanyInformation
                                    {...displayData}
                                    onFieldChange={handleFieldChange}
                                    edit={isEditing}
                                />

                                {isEditing && (
                                    <div className="pt-2">
                                        <Button
                                            onClick={handleSave}
                                            variant="blue"
                                            size="lg"
                                            fullWidth
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Each card has its own drawer instance */}
            <AddressTransactionsDrawer
                isOpen={drawerOpen}
                addressId={addressId}
                onClose={() => setDrawerOpen(false)}
            />
        </>
    );
};

export default React.memo(AddressCard, (prevProps, nextProps) => {
    return prevProps.addressId === nextProps.addressId;
});
