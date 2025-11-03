import axios from "axios";
import api from "./apiService";

export const AddressService = {
    async fetchAddress() {
        try {
            const response = await api.get(`/addresses`);
            return response.data;
        } catch (error) {
            console.error("fetching failed", error);
            throw error;
        }
    },

    async addAddress(formData) {
        try {
            const response = await api.post(`/add-address`, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.phone,
                company: formData.company,
                address_line1: formData.addressLine1,
                address_line2: formData.addressLine2,
                room_num: formData.roomNum,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log("error saving address", error);
            throw error;
        }
    },

    async editAddress({ id, editData }) {
        try {
            const response = await api.post(`/edit-address/${id}`, {
                editData,
            });
            console.log(response.data);
            return response.data;
        } catch (e) {
            throw e;
        }
    },
};
