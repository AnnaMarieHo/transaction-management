import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

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

    const [showAddressForm, setShowAddressForm] = useState(false);

    const handleToggle = () => {
        setShowAddressForm(!showAddressForm);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pre-submit check
        if (!formData.firstName || !formData.addressLine1) return;

        addAddress(formData);

        // Reset and close
        setFormData({
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
        setShowAddressForm(false);
    };

    const inputClasses =
        "w-full bg-slate-50 border border-slate-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700 placeholder:text-slate-400 text-sm";

    return (
        <div className="max-w-lg m-7 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden transition-all duration-500">
            <div className="p-6 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">
                        {showAddressForm ? "New Address" : "Add Addresses"}
                    </h2>
                    <p className="text-slate-500 text-xs">
                        {showAddressForm
                            ? "Fill in the delivery details"
                            : "Add a new location to your list"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                        showAddressForm
                            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    }`}
                >
                    {showAddressForm ? (
                        <>
                            <FaTimes /> Cancel
                        </>
                    ) : (
                        <>
                            <FaPlus /> Add New
                        </>
                    )}
                </button>
            </div>

            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    showAddressForm
                        ? "max-h-[1000px] opacity-100 border-t border-slate-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4 bg-white"
                >
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
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <input
                            className={inputClasses}
                            name="company"
                            placeholder="Company (Optional)"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>

                    {/* <div className="space-y-3">
                        <input
                            className={inputClasses}
                            name="addressLine1"
                            placeholder="Street Address"
                            value={formData.addressLine1}
                            onChange={handleChange}
                        /> */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className={inputClasses}
                            name="addressLine1"
                            placeholder="Street Address"
                            value={formData.addressLine1}
                            onChange={handleChange}
                        />
                        <input
                            className={inputClasses}
                            name="roomNum"
                            placeholder="Room/Floor"
                            value={formData.roomNum}
                            onChange={handleChange}
                        />
                    </div>
                    {/* </div> */}

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

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg active:scale-[0.98] transition-all uppercase text-xs tracking-widest mt-2"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
