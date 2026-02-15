import React from "react";
import { formatPhone } from "../../utils/formattingUtils";
import FormField from "./FormField";
import Badge from "../atoms/Badge";

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

    return (
        <div className="w-full space-y-1 sm:space-y-2 lg:space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 sm:gap-2 border-b border-slate-200 dark:border-slate-600 pb-1.5 sm:pb-2">
                <div className="min-w-0 flex-1">
                    <h2 className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                        Contact
                    </h2>
                    <div className="flex gap-1 text-base sm:text-lg lg:text-xl font-semibold text-slate-800 dark:text-slate-100 truncate">
                        <span>{first_name}</span>
                        <span>{last_name}</span>
                    </div>
                </div>
                <Badge variant="blue" className="flex-shrink-0">
                    {company || "Personal"}
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <FormField
                    label="First Name"
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                    disabled={!edit}
                    variant={edit ? "minimal" : "transparent"}
                    placeholder="First Name"
                />
                <FormField
                    label="Last Name"
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                    disabled={!edit}
                    variant={edit ? "minimal" : "transparent"}
                    placeholder="Last Name"
                />
                <FormField
                    label="Phone"
                    name="phone"
                    value={phone}
                    onChange={(e) =>
                        onFieldChange("phone", formatPhone(e.target.value))
                    }
                    disabled={!edit}
                    variant={edit ? "minimal" : "transparent"}
                    placeholder="(000) 000-0000"
                />
                <FormField
                    label="Company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    disabled={!edit}
                    variant={edit ? "minimal" : "transparent"}
                    placeholder="Company Name"
                />
            </div>
        </div>
    );
};

export default PersonalInformation;
