import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const CompanyCard = ({
    id,
    roomNum,
    key,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    editAddress,
    onEdit,
    edit,
}) => {
    const [storedAdress, setStoredAddress] = useState({
        id: id,
        addressLine1: addressLine1,
        roomNum: roomNum,
        city: city,
        state: state,
        zip: zip,
    });

    console.log("ADDRESS LINE 1", addressLine1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoredAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const onSave = () => {
        console.log(id);
        editAddress(storedAdress);
    };

    return (
        <>
            <div className="flex flex-col w-full items-start justify-between p-1 bg-blue-50 border-l border-r border-b border-neutral-200 mb-4">
                <div className="flex flex-col w-full">
                    <h1 className="bg-blue-100 text-slate-500 px-2 font-medium rounded-xs">
                        Address
                    </h1>

                    <div
                        className="flex flex-row w-full items-center justify-between pr-2"
                        key={id}
                    >
                        <h1 className="text-slate-500 font-medium p-3 rounded-xs">
                            {!addressLine1 ? "NULL" : addressLine1}{" "}
                            {!roomNum ? "" : roomNum} {!city ? "NULL" : city}{" "}
                            {!state ? "NULL" : state} {!zip ? "NULL" : zip}
                        </h1>
                        <button
                            onClick={onEdit}
                            className="border bg-slate-200 border-slate-300 rounded-md p-2 text-slate-500"
                        >
                            <FaEdit />
                        </button>
                    </div>

                    {edit && (
                        <div className="flex flex-col p-1">
                            <div className="flex flex-row w-full mt-1 gap-2">
                                <input
                                    className="border bg-white border-slate-300 rounded-md text-slate-500 w-2/4"
                                    type="text"
                                    name="addressLine1"
                                    onChange={handleChange}
                                    value={storedAdress.addressLine1}
                                    placeholder="Address"
                                />
                                <input
                                    className="border bg-white border-slate-300 rounded-md p-1 text-slate-500 w-2/4"
                                    type="text"
                                    name="roomNum"
                                    onChange={handleChange}
                                    value={storedAdress.roomNum}
                                    placeholder="room number"
                                />
                            </div>
                            <div className="flex flex-row w-full my-2 gap-2">
                                <input
                                    className="border bg-white border-slate-300 rounded-md p-1 text-slate-500 w-1/3"
                                    type="text"
                                    name="city"
                                    placeholder="city"
                                    onChange={handleChange}
                                    value={storedAdress.city}
                                />
                                <input
                                    className="border bg-white border-slate-300 rounded-md p-1 text-slate-500 w-1/3"
                                    type="text"
                                    name="state"
                                    placeholder="state"
                                    onChange={handleChange}
                                    value={storedAdress.state}
                                />
                                <input
                                    className="border bg-white border-slate-300 rounded-md p-1 text-slate-500 w-1/3"
                                    type="text"
                                    name="zip"
                                    placeholder="zip"
                                    onChange={handleChange}
                                    value={storedAdress.zip}
                                />
                            </div>
                            <button
                                onClick={onSave}
                                className="bg-slate-300 text-slate-600 p-2 mt-1 mb-2 font-medium rounded"
                            >
                                save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CompanyCard;
