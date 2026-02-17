import api from "./apiService";

export const fetchGlobalStats = async () => {
    try {
        console.log("triggered in statsService");
        const response = await api.get("/stats");
        console.log("global stats: ", response);
        return response.data;
    } catch (e) {
        console.error("Error fetching global stats:", e);
        throw e;
    }
};

export const fetchUserStats = async (addressId) => {
    try {
        const response = await api.get(`/stats/user/${addressId}`);
        return response.data;
    } catch (e) {
        console.error("Error fetching user stats:", e);
        throw e;
    }
};

export const fetchTopPartners = async (addressId) => {
    try {
        const response = await api.get(`/stats/partners/${addressId}`);
        return response.data;
    } catch (e) {
        console.error("Error fetching partners:", e);
        throw e;
    }
};
