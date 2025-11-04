import { useEffect, useState } from "react";
import { AddressService } from "../services/addressService";

export const useAddress = () => {
    const [addresses, setAddress] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AddressService.fetchAddress();
                setAddress(response);
            } catch (e) {
                console.error("Error fetching receipts:", e);
            }
        };
        fetchData();
    }, []);

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
            console.log("IN USEADDRESS HOOK EDIT:", editData);
            const response = await AddressService.editAddress(editData);
            setAddress((prev) => [response.data, ...prev]);
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
            setAddress(response);
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
    return { addresses, addAddress, editAddress, deleteAddress };
};
