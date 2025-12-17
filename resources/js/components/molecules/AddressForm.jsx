import { use, useState } from "react";
import React from "react";

const AddressForm = ({ addAddress }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
        addressLine1: "",
        addressLine2: "",
        roomNum: "",
        city: "",
        state: "",
        zip: "",
    });

    const [submit, setSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addAddress(formData);
        setSubmit(!submit);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const inputClasses =
        "w-full bg-white border border-slate-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700";

    return (
        <div className="max-w-lg mx-auto m-7 bg-white border border-slate-200 rounded-xl p-8 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
                Add New Address
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        className={inputClasses}
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClasses}
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        className={inputClasses}
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClasses}
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <input
                    className={inputClasses}
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                />

                <div className="grid grid-cols-3 gap-4">
                    <input
                        className={inputClasses}
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClasses}
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClasses}
                        name="zip"
                        placeholder="Zip"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-black text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all uppercase text-xs tracking-widest mt-4"
                >
                    Add Address
                </button>
            </form>
        </div>
    );
};
export default AddressForm;
