import React, { useState } from "react";

const PersonalCard = ({ id, firstName, lastName, phone, company, edit }) => {
    const [save, setSave] = useState(false);

    const formatPhone = (value) => {
        value = value.replace(/\D/g, "");
        if (value.length > 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
                6,
                10
            )}`;
        } else if (value.length > 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        return value;
    };

    const buildFullName = (first, last) => {
        return `${first || ""} ${last || ""}`.trim();
    };

    const [profile, setProfile] = useState({
        fullName: buildFullName(firstName, lastName),
        firstName: firstName,
        lastName: lastName,
        company: company,
        phone: formatPhone(phone?.toString() || ""),
    });

    const onPhoneChange = (e) => {
        let value = formatPhone(e.target.value);
        setProfile((prev) => ({
            ...prev,
            phone: value,
        }));
    };

    const onProfileChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSave = () => {
        const split = profile.fullName.trim().split(" ");
        setProfile((prev) => ({
            ...prev,
            firstName: split[0] || "",
            lastName: split.slice(1).join(" "),
        }));
        setSave(true);
    };

    return (
        <div className="flex flex-col w-full py-1 items-start border-l border-r border-t border-neutral-200 justify-between bg-white">
            <div className="flex flex-row my-1 w-full px-1">
                <div className="px-1 w-24 shrink-0" key={id}>
                    <h1 className="py-1 text-slate-500 font-medium px-1 rounded-xs color">
                        Full Name:
                    </h1>
                </div>
                <input
                    placeholder="full name"
                    name="fullName"
                    value={profile.fullName}
                    onChange={onProfileChange}
                    disabled={!edit}
                    className="px-1 bg-slate-100 flex-1 min-w-0 py-1 rounded-xs color"
                />
            </div>
            <div className="flex flex-row w-full px-1">
                <div className="px-1 w-24 shrink-0" key={id}>
                    <h1 className="py-1 text-slate-500 font-medium px-1 rounded-xs color">
                        Phone:
                    </h1>
                </div>
                <input
                    placeholder="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={onPhoneChange}
                    disabled={!edit}
                    className="px-1 bg-slate-100 flex-1 min-w-0 py-1 rounded-xs color"
                />
            </div>
            <div className="flex flex-row w-full px-1 py-1">
                <div className="px-1 w-24 shrink-0" key={id}>
                    <h1 className="py-1 text-slate-500 font-medium px-1 rounded-xs color">
                        Company:
                    </h1>
                </div>
                <input
                    placeholder="company"
                    name="company"
                    value={profile.company}
                    onChange={onProfileChange}
                    disabled={!edit}
                    className="px-1 bg-slate-100 flex-1 min-w-0 py-1 rounded-xs color"
                />
            </div>
        </div>
    );
};

export default PersonalCard;
