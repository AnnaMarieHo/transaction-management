import React from "react";
import Button from "./Button";

const ReceiptDrawerButtons = ({ onFilterChange, currentFilter }) => {
    return (
        <div className="p-4 border-b border-slate-100 flex gap-2">
            <Button
                onClick={() => onFilterChange("All")}
                variant={currentFilter === "All" ? "dark" : "ghost"}
            >
                All
            </Button>
            <Button
                onClick={() => onFilterChange("Incoming")}
                variant={currentFilter === "Incoming" ? "blue" : "ghost"}
            >
                Incoming
            </Button>
            <Button
                onClick={() => onFilterChange("Outgoing")}
                variant={currentFilter === "Outgoing" ? "green" : "ghost"}
            >
                Outgoing
            </Button>
        </div>
    );
};
export default ReceiptDrawerButtons;
