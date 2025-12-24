import React from "react";

const CompanyInformation = ({
    room_num,
    address_line1,
    city,
    state,
    zip,
    edit,
    onFieldChange,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFieldChange(name, value);
    };

    const inputClasses =
        "w-full bg-white border border-slate-200 rounded-md p-2 text-sm text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all";

    return (
        <div className="w-full">
            <h2 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                Location
            </h2>

            {!edit ? (
                <div className="text-slate-600 leading-relaxed bg-slate-100 p-3 rounded-lg border border-slate-100">
                    <p className="font-medium text-slate-800">
                        {address_line1} {room_num && `• Unit ${room_num}`}
                    </p>
                    <p>
                        {city}, {state} {zip}
                    </p>
                </div>
            ) : (
                <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex gap-2">
                        <div className="flex-[3]">
                            <input
                                name="address_line1"
                                value={address_line1 || ""}
                                onChange={handleChange}
                                placeholder="Street Address"
                                className={inputClasses}
                            />
                        </div>
                        <div className="flex-[1]">
                            <input
                                name="room_num"
                                value={room_num || ""}
                                onChange={handleChange}
                                placeholder="Unit"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <input
                            name="city"
                            value={city || ""}
                            onChange={handleChange}
                            placeholder="City"
                            className={inputClasses}
                        />
                        <input
                            name="state"
                            value={state || ""}
                            onChange={handleChange}
                            placeholder="State"
                            className={inputClasses}
                        />
                        <input
                            name="zip"
                            value={zip || ""}
                            onChange={handleChange}
                            placeholder="Zip"
                            className={inputClasses}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyInformation;
