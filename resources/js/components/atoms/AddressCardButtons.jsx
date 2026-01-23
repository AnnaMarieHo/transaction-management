import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import Button from "./Button";

const AddressCardButtons = (props) => {
    const {
        isEditing,
        handleDelete,
        onEditToggle,
        handleViewTransactions,
        numberTransactions,
    } = props;
    return (
        <div className="absolute top-[-1.5rem] right-2 sm:right-4 flex flex-wrap gap-1.5 sm:gap-2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Button
                onClick={handleDelete}
                variant="red"
                icon={FaRegTrashAlt}
                size="sm"
            >
                <span className="hidden sm:inline">Delete</span>
            </Button>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onEditToggle();
                }}
                variant={isEditing ? "dark" : "amber"}
                icon={FaEdit}
                size="sm"
            >
                {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button
                onClick={handleViewTransactions}
                variant="blue-outline"
                icon={IoReceiptSharp}
                size="sm"
            >
                <span className="hidden sm:inline">{numberTransactions} </span>
                <span className="hidden xs:inline sm:hidden">
                    {numberTransactions}
                </span>
                Transactions
            </Button>
        </div>
    );
};
export default AddressCardButtons;
