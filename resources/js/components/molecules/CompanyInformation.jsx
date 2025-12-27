import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

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

    return (
        <div className="w-full">
            <Label className="mb-1.5 sm:mb-2">Location</Label>

            {!edit ? (
                <div className="text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50 sm:bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-100">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                        {address_line1} {room_num && `• ${room_num}`}
                    </p>
                    <p className="text-sm sm:text-base">
                        {city}, {state} {zip}
                    </p>
                </div>
            ) : (
                <div className="space-y-2 sm:space-y-3 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-[3]">
                            <Input
                                name="address_line1"
                                value={address_line1}
                                onChange={handleChange}
                                placeholder="Street Address"
                                variant="minimal"
                            />
                        </div>
                        <div className="flex-[1]">
                            <Input
                                name="room_num"
                                value={room_num}
                                onChange={handleChange}
                                placeholder="Unit"
                                variant="minimal"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <Input
                            name="city"
                            value={city}
                            onChange={handleChange}
                            placeholder="City"
                            variant="minimal"
                        />
                        <Input
                            name="state"
                            value={state}
                            onChange={handleChange}
                            placeholder="State"
                            variant="minimal"
                        />
                        <Input
                            name="zip"
                            value={zip}
                            onChange={handleChange}
                            placeholder="Zip"
                            variant="minimal"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyInformation;
