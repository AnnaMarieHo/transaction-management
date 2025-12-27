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
        <div className="absolute top-[-1.5rem] right-4 flex gap-2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Button onClick={handleDelete} variant="red" icon={FaRegTrashAlt}>
                Delete
            </Button>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onEditToggle();
                }}
                variant={isEditing ? "dark" : "amber"}
                icon={FaEdit}
            >
                {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button
                onClick={handleViewTransactions}
                variant="blue-outline"
                icon={IoReceiptSharp}
            >
                {numberTransactions} Transactions
            </Button>
        </div>
    );
};
export default AddressCardButtons;
