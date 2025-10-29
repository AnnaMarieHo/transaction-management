import api from "./apiService";
import React from "react";

export const fetchReceipts = async () => {
    try {
        const response = await api.get("/test-receipts");
        console.log("IN SERVICE", response);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
