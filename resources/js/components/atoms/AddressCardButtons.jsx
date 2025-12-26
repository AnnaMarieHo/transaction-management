import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";

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
            <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-red-100 text-red-600 rounded-full shadow-lg hover:bg-red-50 transition-colors"
            >
                <FaRegTrashAlt className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                    Delete
                </span>
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onEditToggle();
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-all ${
                    isEditing
                        ? "bg-slate-800 text-white"
                        : "bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50"
                }`}
            >
                <FaEdit className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                    {isEditing ? "Cancel" : "Edit"}
                </span>
            </button>
            <button
                onClick={handleViewTransactions}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-100 text-blue-600 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
                <IoReceiptSharp className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                    {numberTransactions} Transactions
                </span>
            </button>
        </div>
    );
};
export default AddressCardButtons;
