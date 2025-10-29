import axios from "axios";
import api from "./apiService";

export const AddressService = {
    async fetchAddress() {
        try {
            const response = await api.get(`/test-addresses`);
            return response.data;
        } catch (error) {
            console.error("fetching failed", error);
            throw error;
        }
    },
};
