import { fetchReceipts } from "../services/receiptService";
import React, { useEffect, useState } from "react";

export const useReceipt = () => {
    const [receipts, setReceipts] = useState([]);
    useEffect(() => {
        const loadReceipts = async () => {
            try {
                const data = await fetchReceipts();
                console.log("DATA", data);
                setReceipts(data);
            } catch (e) {
                console.log(e);
                throw e;
            }
        };
        loadReceipts();
    }, []);
    return { receipts };
};
