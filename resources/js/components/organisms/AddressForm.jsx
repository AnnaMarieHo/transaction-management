import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

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

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden transition-all duration-500">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 bg-white">
                <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 truncate">
                        {showAddressForm
                            ? "New Client Address"
                            : "Add Client Addresses"}
                    </h2>
                    <p className="text-slate-500 text-xs truncate">
                        {showAddressForm
                            ? "Fill in the delivery details"
                            : "Add a new location to your list"}
                    </p>
                </div>

                <Button
                    type="button"
                    onClick={handleToggle}
                    variant={showAddressForm ? "gray" : "blue"}
                    icon={showAddressForm ? FaTimes : FaPlus}
                    size="sm"
                    className="w-full sm:w-auto flex-shrink-0"
                >
                    {showAddressForm ? "Cancel" : "Add New"}
                </Button>
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
                    className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Input
                            name="company"
                            placeholder="Company (Optional)"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            name="addressLine1"
                            placeholder="Street Address"
                            value={formData.addressLine1}
                            onChange={handleChange}
                        />
                        <Input
                            name="roomNum"
                            placeholder="Room/Floor"
                            value={formData.roomNum}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        <Input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <Input
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                        />
                        <Input
                            name="zip"
                            placeholder="Zip"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="blue"
                            size="lg"
                            fullWidth
                        >
                            Save Address
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
