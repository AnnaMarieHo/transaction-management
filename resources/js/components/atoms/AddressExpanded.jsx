import React from "react";
import CompanyInformation from "../molecules/CompanyInformation";
import PersonalInformation from "../molecules/PersonalInformation";
import Divider from "./Divider";
import Button from "./Button";

const AddressExpanded = ({ isEditing, addresses, updateAddress, onSave }) => {
    return (
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
            <PersonalInformation
                {...addresses}
                onFieldChange={(n, v) => updateAddress(addresses.id, n, v)}
                edit={isEditing}
            />

            <Divider />

            <CompanyInformation
                {...addresses}
                onFieldChange={(n, v) => updateAddress(addresses.id, n, v)}
                edit={isEditing}
            />

            {isEditing && (
                <div className="pt-2 animate-in zoom-in-95 duration-200">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSave(addresses);
                        }}
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
