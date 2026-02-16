import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { addAddress } from "../../store/slices/addressSlice";
import { useDispatch } from "react-redux";

const AddressForm = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
        setError(null); // Clear error when toggling
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null); // Clear error on input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.firstName || !formData.addressLine1) {
            setError("First name and address are required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await dispatch(addAddress(formData)).unwrap();
            
            // Reset and close on success
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
        } catch (err) {
            setError(err.message || "Failed to add address");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-xl dark:shadow-none overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 bg-white dark:bg-slate-800">
                <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 truncate">
                        {showAddressForm
                            ? "New Client Address"
                            : "Add Client Addresses"}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
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
                    disabled={isLoading}
                >
                    {showAddressForm ? "Cancel" : "Add New"}
                </Button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    showAddressForm
                        ? "max-h-[1000px] opacity-100 border-t border-slate-100 dark:border-slate-700"
                        : "max-h-0 opacity-0"
                }`}
            >
                <form
                    onSubmit={handleSubmit}
                    className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white dark:bg-slate-800"
                >
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <Input
                            name="company"
                            placeholder="Company (Optional)"
                            value={formData.company}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            name="addressLine1"
                            placeholder="Street Address"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />
                        <Input
                            name="roomNum"
                            placeholder="Room/Floor"
                            value={formData.roomNum}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        <Input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <Input
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <Input
                            name="zip"
                            placeholder="Zip"
                            value={formData.zip}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="blue"
                            size="lg"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                "Save Address"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
