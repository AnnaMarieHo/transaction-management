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
    return { addresses };
};
