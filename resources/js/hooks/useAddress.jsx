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
    }, [addresses]);

    const addAddress = async (formData) => {
        try {
            const response = await AddressService.addAddress(formData);
            console.log(response);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    return { addresses, addAddress, setAddress };
};
