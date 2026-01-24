import React from "react";
import CompanyInformation from "../molecules/CompanyInformation";
import PersonalInformation from "../molecules/PersonalInformation";
import Divider from "./Divider";
import Button from "./Button";
import AddressCardButtons from "./AddressCardButtons";
import { useReceipt } from "../../hooks/useReceipt";
import {
    updateAddress,
    editAddress,
    toggleEditingId,
    openTransactions,
    closeTransactions,
    deleteAddress,
    markDeleting,
} from "../../store/slices/addressSlice";
import { useSelector, useDispatch } from "react-redux";

const AddressExpanded = ({ addressId }) => {

    const dispatch = useDispatch();
    const { receipts } = useReceipt();
    const address = useSelector((state) =>
        state.addresses.addresses.find((a) => a.id === addressId)
    );
    const { editingId, transactionsForId } = useSelector(
        (state) => state.addresses.ui
    );
    const isEditing = editingId === addressId;
    const viewTransactions = transactionsForId === addressId;
    
    if (!address) return null;

    const activeBuyerReceipts = receipts.filter(
        (receipt) => receipt.b_id === address.id
    );
    const activeSellerReceipts = receipts.filter(
        (receipt) => receipt.s_id === address.id
    );
    const numberTransactions =
        activeBuyerReceipts.length + activeSellerReceipts.length;

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(markDeleting(addressId));
        // Wait for the animation (300ms) before actually removing address from the data
        setTimeout(() => {
            dispatch(deleteAddress(addressId));
        }, 300);
    };

    const handleViewTransactions = (e) => {
        e.stopPropagation();
        if (viewTransactions) {
            dispatch(closeTransactions());
        } else {
            dispatch(openTransactions(addressId));
        }
    };

    const handleSave = (e) => {
        e.stopPropagation();
        dispatch(editAddress(address));
    };
    return (
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
            <AddressCardButtons
                handleDelete={handleDelete}
                isEditing={isEditing}
                onEditToggle={() => dispatch(toggleEditingId(addressId))}
                handleViewTransactions={handleViewTransactions}
                numberTransactions={numberTransactions}
            />
            <PersonalInformation
                {...address}
                onFieldChange={(name, value) =>
                    dispatch(updateAddress({ id: addressId, name, value }))
                }
                edit={isEditing}
            />

            <Divider />
            <CompanyInformation
                {...address}
                onFieldChange={(name, value) =>
                    dispatch(updateAddress({ id: addressId, name, value }))
                }
                edit={isEditing}
            />

            {isEditing && (
                <div className="pt-2 animate-in zoom-in-95 duration-200">
                    <Button
                        onClick={handleSave}
                        variant="blue"
                        size="lg"
                        fullWidth
                    >
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AddressExpanded;
