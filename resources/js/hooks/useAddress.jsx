import { useEffect, useState } from "react";
import { AddressService } from "../services/addressService";

export const useAddress = () => {
    const [addresses, setAddress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AddressService.fetchAddress();
                setAddress(Array.isArray(response) ? response : []);
            } catch (e) {
                console.error("Error fetching receipts:", e);
            }
        };
        fetchData();
    }, []);

    const updateAddress = (id, name, value) => {
        setAddress((prev) =>
            prev.map((address) =>
                address.id === id ? { ...address, [name]: value } : address
            )
        );
    };

    const addAddress = async (formData) => {
        try {
            const response = await AddressService.addAddress(formData);
            setAddress((prev) => [response.data, ...prev]);
            console.log(response);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const editAddress = async (editData) => {
        try {
            const response = await AddressService.editAddress(editData);
            const updated = response?.data ?? response;
            if (!updated || updated.id == null) return;
            setAddress((prev) =>
                prev.map((a) => (a.id === updated.id ? updated : a))
            );
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    const deleteAddress = async (id) => {
        console.log(id);
        setAddress((prev) => prev.filter((a) => a.id !== id));
        try {
            await AddressService.deleteAddress(id);
            const response = await AddressService.fetchAddress();
            setAddress(Array.isArray(response) ? response : []);
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    const toggleActive = () => {
        setIsActive(!isActive);
        console.log(isActive);
    };

    return {
        addresses,
        addAddress,
        updateAddress,
        editAddress,
        deleteAddress,
    };
};
