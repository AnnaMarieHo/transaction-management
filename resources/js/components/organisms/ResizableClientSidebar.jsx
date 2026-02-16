import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ResizableClientSidebar = ({ children, activeId }) => {
    const addresses = useSelector((state) => state.addresses.addresses);
    const editingId = useSelector((state) => state.addresses.ui.editingId);
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

        if (deltaYAbs > 5) {
            hasDragged.current = true;
        }

        if (hasDragged.current) {
            const deltaY = dragStartY.current - clientY;
            const newHeight = dragStartHeight.current + deltaY;

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
            setClientListMinimized(!clientListMinimized);
            setCustomHeight(null);
        }
        setIsDragging(false);
        hasDragged.current = false;
    };

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
            className={`fixed lg:relative bottom-0 lg:bottom-auto left-0 lg:left-auto w-full lg:w-5/12 bg-white dark:bg-slate-800 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.3)] lg:shadow-none rounded-t-3xl lg:rounded-none z-10 flex flex-col transition-colors ${
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
                className={`lg:hidden w-full flex items-center justify-center py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 cursor-ns-resize select-none flex-shrink-0 ${
                    isDragging
                        ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700/50 active:bg-slate-100 dark:active:bg-slate-700"
                } transition-colors`}
            >
                <div className="flex flex-col items-center gap-1.5">
                    <div
                        className={`w-10 h-1 rounded-full transition-colors ${
                            isDragging
                                ? "bg-blue-400 dark:bg-blue-400"
                                : "bg-slate-300 dark:bg-slate-600"
                        }`}
                    />
                    {activePerson && clientListMinimized && (
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {activePerson.first_name} {activePerson.last_name}
                        </span>
                    )}
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
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
