import { createContext, useContext, useEffect, useState } from "react";
import { fetchReceipts } from "../services/receiptService";
import React from "react";

export const DataContext = createContext({ receipts: [] });

export const ReceiptProvider = ({ children }) => {
    const [receipts, setReceipt] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const receipts = await fetchReceipts();
                setReceipt(receipts);
            } catch (e) {
                console.log(e);
                throw e;
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        console.log("IN CONTEXT", receipts);
    });
    return (
        <DataContext.Provider value={{ receipts, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export const useReceiptContext = () => {
    return useContext(DataContext);
};
