import { use, useState } from "react";
import React from "react";

const AddressForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
        address: "",
        roomNum: "",
        city: "",
        state: "",
        zip: "",
    });

    const [submit, setSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(!submit);
    };

    return (
        <div className=" m-7 bg-orange-100 min-w-sm rounded-md flex p-10 shadow-2xl  shadow-black/20 flex-col">
            <div className="flex flex-row">
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm  outline-none"
                    name="firstName"
                    type="text"
                    placeholder="first name"
                    value={formData.firstName}
                    onChange={handleChange}
                ></input>
                <input
                    className="w-full  m-2 bg-white p-3 rounded-sm outline-none"
                    name="lastName"
                    type="text"
                    placeholder="last name"
                    value={formData.lastName}
                    onChange={handleChange}
                ></input>
            </div>
            <div className="flex flex-row">
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="phone"
                    type="text"
                    placeholder="phone"
                    value={formData.phone}
                    onChange={handleChange}
                ></input>
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="company"
                    type="company"
                    placeholder="company"
                    value={formData.company}
                    onChange={handleChange}
                ></input>
            </div>
            <div className="flex flex-row">
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="address"
                    type="text"
                    placeholder="address"
                    value={formData.address}
                    onChange={handleChange}
                ></input>
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="roomNum"
                    type="text"
                    placeholder="room number"
                    value={formData.roomNum}
                    onChange={handleChange}
                ></input>
            </div>
            <div className="flex flex-row">
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="city"
                    type="text"
                    placeholder="city"
                    value={formData.city}
                    onChange={handleChange}
                ></input>
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="state"
                    type="text"
                    placeholder="state"
                    value={formData.state}
                    onChange={handleChange}
                ></input>
                <input
                    className="w-full m-2 bg-white p-3 rounded-sm outline-none"
                    name="zip"
                    type="text"
                    placeholder="zip"
                    value={formData.zip}
                    onChange={handleChange}
                ></input>
            </div>
            <div className="flex w-full flex-row">
                <button
                    onClick={handleSubmit}
                    className="w-full border-orange-500 border-md m-4 bg-orange-400 rounded-md p-3"
                >
                    submit
                </button>
            </div>
            <div>
                <div>
                    {!submit ? (
                        ""
                    ) : (
                        <ul>
                            {Object.entries(formData).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
