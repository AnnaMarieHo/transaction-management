import React, { useEffect, useRef, useState } from "react";
import AddressCollapsed from "../atoms/AddressCollapsed";
import AddressExpanded from "./AddressExpanded";
import { useSelector } from "react-redux";
import {
    selectAddressById,
    selectIsAddressDeleting,
} from "../../store/selectors";

const AddressCard = ({ addressId, activeId, onToggleActive }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    const address = useSelector((state) => selectAddressById(state, addressId));
    const isDeleting = useSelector((state) =>
        selectIsAddressDeleting(state, addressId)
    );
    const editingId = useSelector((state) => state.addresses.ui.editingId);

    const isActive = activeId === addressId;
    const isEditing = editingId === addressId;
    
    const handleToggle = (e) => {
        // Don't toggle if editing this card
        if (isEditing) return;
        
        // Don't toggle if clicking on interactive elements
        const target = e.target;
        const isInteractive = target.closest('input, button, textarea, select, a, [role="button"]');
        if (isInteractive) return;
        
        const nextActiveId = activeId === addressId ? null : addressId;
        onToggleActive(nextActiveId);
    };

    if (!address) return null;

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
                    block: "start",
                });
            }, 100);
        }
    }, [isActive]);

    return (
        <>
            <div
                ref={cardRef}
                className={`w-full relative scroll-mt-16
            ${
                !isVisible || isDeleting
                    ? "opacity-0 scale-75 max-h-0 mb-0 overflow-hidden"
                    : "opacity-100 scale-100 max-h-[1000px] mb-3 sm:mb-4"
            }
        `}
            >
                <div
                    onClick={handleToggle}
                    className={`group flex flex-col w-full rounded-xl ${
                        isActive ? "overflow-visible" : "overflow-hidden"
                    }
                ${
                    isActive
                        ? "scale-100 ring-2 ring-blue-500 dark:ring-blue-400 shadow-2xl bg-white dark:bg-slate-800"
                        : "scale-95 sm:scale-90 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm"
                } ${isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                >
                    <div
                        className={`h-1.5 w-full ${
                            isActive
                                ? "bg-blue-500 dark:bg-blue-500"
                                : "bg-slate-200 dark:bg-slate-600 "
                        }`}
                    />

                    <div className="p-2.5 sm:p-3 lg:p-4">
                        {!isActive ? (
                            <AddressCollapsed addresses={address} />
                        ) : (
                            <AddressExpanded addressId={addressId} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(AddressCard, (prevProps, nextProps) => {
    // Only re-render if:
    // 1. addressId changed
    // 2. This card's active state changed
    const wasActive = prevProps.activeId === prevProps.addressId;
    const isActive = nextProps.activeId === nextProps.addressId;
    
    return (
        prevProps.addressId === nextProps.addressId &&
        wasActive === isActive &&
        prevProps.onToggleActive === nextProps.onToggleActive
    );
});
