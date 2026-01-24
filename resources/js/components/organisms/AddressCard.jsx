import React, { useEffect, useRef, useState } from "react";
import AddressCollapsed from "../atoms/AddressCollapsed";
import AddressExpanded from "../atoms/AddressExpanded";
import {
    toggleActiveId,
} from "../../store/slices/addressSlice";
import { useSelector, useDispatch } from "react-redux";

const AddressCard = ({ addressId }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { activeId, deletingById } = useSelector((state) => state.addresses.ui);
    const address = useSelector((state) =>
        state.addresses.addresses.find((a) => a.id === addressId)
    );
    
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const isActive = activeId === addressId;
    const isDeleting = Boolean(deletingById?.[addressId]);
    


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
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }, [isActive]);

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
                <div
                    onClick={() => dispatch(toggleActiveId(addressId))}
                    className={`group flex flex-col w-full rounded-xl transition-all duration-300 ${
                        isActive ? "overflow-visible" : "overflow-hidden"
                    }
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
                            <AddressCollapsed addresses={address} />
                        ) : (
                            <AddressExpanded
                                addressId={addressId}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressCard;
