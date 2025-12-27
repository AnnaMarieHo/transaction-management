import React from "react";

import CompanyInformation from "../molecules/CompanyInformation";
import PersonalInformation from "../molecules/PersonalInformation";

const AddressExpanded = ({ isEditing, addresses, updateAddress, onSave }) => {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
            <PersonalInformation
                {...addresses}
                onFieldChange={(n, v) => updateAddress(addresses.id, n, v)}
                edit={isEditing}
            />

            <div className="h-[1px] w-full bg-slate-100" />

            <CompanyInformation
                {...addresses}
                onFieldChange={(n, v) => updateAddress(addresses.id, n, v)}
                edit={isEditing}
            />

            {isEditing && (
                <div className="pt-2 animate-in zoom-in-95 duration-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSave(addresses);
                        }}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all uppercase text-sm tracking-widest"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddressExpanded;
