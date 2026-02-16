// resources/js/services/statsService.js
import api from "./apiService";

export const fetchGlobalStats = async () => {
    try {
        const response = await api.get("/stats");
        return response.data;
    } catch (e) {
        console.error("Error fetching global stats:", e);
        throw e;
    }
};

export const fetchUserStats = async (addressId) => {
    try {
        const response = await api.get(`/stats/user/${addressId}`);
        console.log(response);
        return response.data;
    } catch (e) {
        console.error("Error fetching user stats:", e);
        throw e;
    }
};

// export const fetchUserPartners = async (addressId) => {
//     try {
//         const response = await api.post(`/individual-stats/${addressId}`);
//         return response.data;
//     } catch (e) {
//         console.error("Error fetching partners:", e);
//         throw e;
//     }
// };
