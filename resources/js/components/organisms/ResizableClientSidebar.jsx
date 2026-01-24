import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ResizableClientSidebar = ({ children }) => {
    const { addresses } = useSelector((state) => state.addresses);
    const { activeId, editingId } = useSelector((state) => state.addresses.ui);
    const isEditing = editingId !== null;

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
            const deltaY = dragStartY.current - clientY; // inverted (dragging from bottom)
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
        if (!isDragging) return;

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
    }, [isDragging]);

    // Reset custom height when minimized or editing state changes
    useEffect(() => {
        if (!isDragging) {
            setCustomHeight(null);
        }
    }, [clientListMinimized, isEditing]);

    const sidebarHeight = customHeight || getDefaultHeight();
    const hasCustomHeight = customHeight !== null;

    const activePerson = activeId
        ? addresses.find((a) => a.id === activeId)
        : null;

    return (
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
                    {activePerson && clientListMinimized && (
                        <span className="text-xs font-semibold text-blue-600">
                            {activePerson.first_name} {activePerson.last_name}
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
                {children}
            </div>
        </div>
    );
};

export default ResizableClientSidebar;

