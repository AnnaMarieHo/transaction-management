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

    async editAddress(editData) {
        try {
            console.log("IN ADDRESS SERVICE: ", editData);
            const response = await api.post(`/edit-address/${editData.id}`, {
                address_line1: editData.addressLine1,
                city: editData.city,
                id: editData.id,
                room_num: editData.roomNum,
                state: editData.state,
                zip: editData.zip,
            });
            console.log(response.data);
            return response.data;
        } catch (e) {
            throw e;
        }
    },

    async deleteAddress(id) {
        console.log(id);
        try {
            const response = await api.delete(`/delete-address/${id}`, {
                id: id,
            });
            console.log(response);
            return response.data;
        } catch (e) {
            throw e;
        }
    },
};
