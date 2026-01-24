import React from "react";
import CompanyInformation from "../molecules/CompanyInformation";
import PersonalInformation from "../molecules/PersonalInformation";
import Divider from "./Divider";
import Button from "./Button";
import { updateAddress, editAddress } from "../../store/slices/addressSlice";
import { useSelector, useDispatch } from "react-redux";

const AddressExpanded = ({ addressId }) => {

    const dispatch = useDispatch();
    const address = useSelector((state) =>
        state.addresses.addresses.find((a) => a.id === addressId)
    );
    const isEditing = useSelector(
        (state) => state.addresses.ui.editingId === addressId
    );
    
    if (!address) return null;

    const handleSave = (e) => {
        e.stopPropagation();
        dispatch(editAddress(address));
    };
    return (
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
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
