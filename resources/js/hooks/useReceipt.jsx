import { fetchReceipts } from "../services/receiptService";
import React, { useEffect, useState } from "react";

export const useReceipt = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadReceipts = async () => {
            try {
                setLoading(true);
                const data = await fetchReceipts();
                console.log("FETCHED RECIEPTS:", data);
                setReceipts(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                throw e;
            }
        };
        loadReceipts();
    }, []);
    return { receipts, loading };
};
