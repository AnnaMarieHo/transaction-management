import React from "react";
import CompanyInformation from "../molecules/CompanyInformation";
import PersonalInformation from "../molecules/PersonalInformation";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";
import AddressCardButtons from "../atoms/AddressCardButtons";
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
import {
    selectAddressById,
    selectEditingId,
    selectTransactionsForId,
    selectReceiptsForAddress,
} from "../../store/selectors";

const AddressExpanded = ({ addressId }) => {
    const dispatch = useDispatch();

    const address = useSelector((state) => selectAddressById(state, addressId));
    const editingId = useSelector(selectEditingId);
    const transactionsForId = useSelector(selectTransactionsForId);
    const { numberTransactions } = useSelector((state) =>
        selectReceiptsForAddress(state, addressId)
    );

    const isEditing = editingId === addressId;
    const viewTransactions = transactionsForId === addressId;

    if (!address) return null;

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
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 ">
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
                <div className="pt-2">
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

export default React.memo(AddressExpanded);
