import React, { useEffect, useState, useRef } from "react";
import ListAddresses from "./molecules/ListAddresses";
import AddressForm from "./organisms/AddressForm";
import ReceiptForm from "./organisms/ReceiptForm";
import { useReceipt } from "../hooks/useReceipt";
import DashboardStats from "./organisms/DashboardStats";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses } from "../store/slices/addressSlice";
import AddressTransactionsDrawer from "./molecules/AddressTransactionsDrawer";


const App = () => {

    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.addresses);
    const { activeId, editingId } = useSelector((state) => state.addresses.ui);
    const isEditing = editingId !== null;
    

    const { receipts } = useReceipt();
    const [showForms, setShowForms] = useState(false);
    const [clientListMinimized, setClientListMinimized] = useState(false);
    const [customHeight, setCustomHeight] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartY = useRef(0);
    const dragStartHeight = useRef(0);
    const sidebarRef = useRef(null);
    const hasDragged = useRef(false);

    const getDefaultHeight = () => {
        if (clientListMinimized) return "65px";
        if (isEditing) return "80vh";
        return "45vh";
    };

    const handleDragStart = (e) => {
        hasDragged.current = false;
        setIsDragging(true);
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        dragStartY.current = clientY;
        if (sidebarRef.current) {
            const currentHeight = sidebarRef.current.offsetHeight;
            dragStartHeight.current = currentHeight;
        }
        e.preventDefault();
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaYAbs = Math.abs(dragStartY.current - clientY);

        // Only start dragging if moved more than 5px (to distinguish from click)
        if (deltaYAbs > 5) {
            hasDragged.current = true;
        }

        if (hasDragged.current) {
            const deltaY = dragStartY.current - clientY; // Inverted because since dragging from bottom
            const newHeight = dragStartHeight.current + deltaY;

            // Constrain height between 65px (minimized) and 90vh (max)
            const minHeight = 65;
            const maxHeight = window.innerHeight * 0.9;
            const constrainedHeight = Math.max(
                minHeight,
                Math.min(maxHeight, newHeight)
            );

            setCustomHeight(`${constrainedHeight}px`);
        }
    };

    const handleDragEnd = (e) => {
        if (!hasDragged.current && e) {
            // If it was just a click (no drag), toggle minimized state
            setClientListMinimized(!clientListMinimized);
            setCustomHeight(null);
        }
        setIsDragging(false);
        hasDragged.current = false;
    };

    // Set up global mouse/touch listeners for dragging
    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e) => handleDragMove(e);
            const handleTouchMove = (e) => handleDragMove(e);
            const handleMouseUp = () => handleDragEnd();
            const handleTouchEnd = () => handleDragEnd();

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("touchend", handleTouchEnd);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("touchmove", handleTouchMove);
                document.removeEventListener("mouseup", handleMouseUp);
                document.removeEventListener("touchend", handleTouchEnd);
            };
        }
    }, [isDragging]);

    // Reset custom height when minimized or editing state changes
    useEffect(() => {
        if (!isDragging) {
            setCustomHeight(null);
        }
    }, [clientListMinimized, isEditing]);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch])

    // Calculate the actual height to use
    const sidebarHeight = customHeight || getDefaultHeight();
    const hasCustomHeight = customHeight !== null;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-slate-50">
            <div className="w-full lg:w-7/12 flex flex-col bg-white overflow-y-auto custom-scrollbar pb-[40vh] lg:pb-0">
                <div className="lg:hidden p-2 border-b border-slate-100">
                    <button
                        onClick={() => setShowForms(!showForms)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <span className="text-sm font-bold text-slate-700">
                            {showForms
                                ? "Hide Forms"
                                : "Add New Client / Receipt"}
                        </span>
                        <svg
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                                showForms ? "rotate-180" : ""
                            }`}
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
                    </button>
                </div>

                <div
                    className={`flex flex-wrap justify-center gap-2 p-2 sm:p-4 border-b border-slate-100 ${
                        showForms ? "flex" : "hidden lg:flex"
                    }`}
                >
                    <div className="flex-1 min-w-[300px] max-w-lg">
                        <AddressForm/>
                    </div>
                    <div className="flex-1 min-w-[300px] max-w-lg">
                        <ReceiptForm addReceipt={() => {}} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/20 custom-scrollbar">
                    <DashboardStats
                        activeId={activeId}
                        receipts={receipts}
                        addresses={addresses}
                    />
                </div>
            </div>

            <div
                ref={sidebarRef}
                className={`fixed lg:relative bottom-0 lg:bottom-auto left-0 lg:left-auto w-full lg:w-5/12 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] lg:shadow-none rounded-t-3xl lg:rounded-none z-10 flex flex-col ${
                    isDragging ? "" : "transition-all duration-300"
                } ${
                    hasCustomHeight
                        ? ""
                        : clientListMinimized
                        ? "h-[65px]"
                        : isEditing
                        ? "h-[80vh]"
                        : "h-[45vh]"
                } lg:h-full`}
                style={hasCustomHeight ? { height: sidebarHeight } : undefined}
            >
                <div
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onTouchEnd={handleDragEnd}
                    className={`lg:hidden w-full flex items-center justify-center py-3 bg-white border-b border-slate-200 cursor-ns-resize select-none flex-shrink-0 ${
                        isDragging
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-slate-50 active:bg-slate-100"
                    } transition-colors`}
                >
                    <div className="flex flex-col items-center gap-1.5">
                        <div
                            className={`w-10 h-1 rounded-full transition-colors ${
                                isDragging ? "bg-blue-400" : "bg-slate-300"
                            }`}
                        />
                        {activeId && clientListMinimized && (
                            <span className="text-xs font-semibold text-blue-600">
                                {
                                    addresses.find((a) => a.id === activeId)
                                        ?.first_name
                                }{" "}
                                {
                                    addresses.find((a) => a.id === activeId)
                                        ?.last_name
                                }
                            </span>
                        )}
                        <span className="text-xs font-medium text-slate-500">
                            {clientListMinimized
                                ? "Show Clients"
                                : isDragging
                                ? "Drag to resize"
                                : "Drag to resize or tap to toggle"}
                        </span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div
                    className={`flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 lg:p-6 ${
                        clientListMinimized ? "hidden lg:block" : "block"
                    }`}
                >
                    <ListAddresses
                    />
                </div>
            </div>
            <AddressTransactionsDrawer />
        </div>
    );
};

export default App;
