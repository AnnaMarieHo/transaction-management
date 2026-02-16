import React, { useEffect, useRef, useState } from "react";
import AddressCollapsed from "../atoms/AddressCollapsed";
import AddressExpanded from "./AddressExpanded";
import { toggleActiveId } from "../../store/slices/addressSlice";
import { useSelector, useDispatch } from "react-redux";
import {
    selectActiveId,
    selectAddressById,
    selectIsAddressDeleting,
} from "../../store/selectors";

const AddressCard = ({ addressId }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const activeId = useSelector(selectActiveId);
    const address = useSelector((state) => selectAddressById(state, addressId));
    const isDeleting = useSelector((state) =>
        selectIsAddressDeleting(state, addressId)
    );

    const isActive = activeId === addressId;

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
                    onClick={() => dispatch(toggleActiveId(addressId))}
                    className={`group flex flex-col w-full rounded-xl will-change-[transform,box-shadow] ${
                        isActive ? "overflow-visible" : "overflow-hidden"
                    }
                ${
                    isActive
                        ? "scale-100 ring-2 ring-blue-500 dark:ring-blue-400 shadow-2xl bg-white dark:bg-slate-800"
                        : "scale-95 sm:scale-90 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm"
                }`}
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

export default React.memo(AddressCard);
