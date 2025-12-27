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
        <div className="w-full space-y-3">
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
                <Badge variant="blue">{company || "Personal"}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
