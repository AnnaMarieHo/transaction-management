import React from "react";
import { formatPhone } from "../../utils/formattingUtils";

const PersonalInformation = ({
    first_name,
    last_name,
    phone,
    company,
    edit,
    onFieldChange,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFieldChange(name, value);
    };

    const inputClasses = `w-full transition-all duration-200 px-2 py-1 rounded border ${
        edit
            ? "bg-white border-blue-200 text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none"
            : "bg-transparent border-transparent text-slate-600 cursor-default"
    }`;

    return (
        <div className="w-full space-y-3">
            {/* Header: Name and Company */}
            <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                <div>
                    <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                        Contact
                    </h2>
                    <div className="flex gap-1 text-lg font-semibold text-slate-800">
                        <span>{first_name}</span>
                        <span>{last_name}</span>
                    </div>
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {company || "Personal"}
                </span>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">
                        First Name
                    </label>
                    <input
                        name="first_name"
                        value={first_name || ""}
                        onChange={handleChange}
                        disabled={!edit}
                        className={inputClasses}
                        placeholder="First Name"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">
                        Last Name
                    </label>
                    <input
                        name="last_name"
                        value={last_name || ""}
                        onChange={handleChange}
                        disabled={!edit}
                        className={inputClasses}
                        placeholder="Last Name"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">
                        Phone
                    </label>
                    <input
                        name="phone"
                        value={phone || ""}
                        onChange={(e) =>
                            onFieldChange("phone", formatPhone(e.target.value))
                        }
                        disabled={!edit}
                        className={inputClasses}
                        placeholder="(000) 000-0000"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">
                        Company
                    </label>
                    <input
                        name="company"
                        value={company || ""}
                        onChange={handleChange}
                        disabled={!edit}
                        className={inputClasses}
                        placeholder="Company Name"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
