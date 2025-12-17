import api from "./apiService";
import React from "react";

export const fetchReceipts = async () => {
    try {
        const response = await api.get("/test-receipts");
        console.log("RECIEPTS SERVICE", response.data);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
