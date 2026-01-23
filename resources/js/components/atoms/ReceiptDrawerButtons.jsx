import React from "react";
import Button from "./Button";

const ReceiptDrawerButtons = ({ onFilterChange, currentFilter }) => {
    return (
        <div className="p-3 sm:p-4 border-b border-slate-100 flex gap-1.5 sm:gap-2">
            <Button
                onClick={() => onFilterChange("All")}
                variant={currentFilter === "All" ? "dark" : "ghost"}
                size="sm"
            >
                All
            </Button>
            <Button
                onClick={() => onFilterChange("Incoming")}
                variant={currentFilter === "Incoming" ? "blue" : "ghost"}
                size="sm"
            >
                Incoming
            </Button>
            <Button
                onClick={() => onFilterChange("Outgoing")}
                variant={currentFilter === "Outgoing" ? "green" : "ghost"}
                size="sm"
            >
                Outgoing
            </Button>
        </div>
    );
};
export default ReceiptDrawerButtons;
