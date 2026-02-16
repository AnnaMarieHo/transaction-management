import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchGlobalStats,
    fetchUserStats,
    fetchTopPartners,
} from "../../services/statsService";

// Fetch global stats (all users)
export const fetchGlobalStatsAsync = createAsyncThunk(
    "stats/fetchGlobal",
    async (_, thunkAPI) => {
        try {
            return await fetchGlobalStats();
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Fetch stats for a specific user
export const fetchUserStatsAsync = createAsyncThunk(
    "stats/fetchUser",
    async (addressId, thunkAPI) => {
        try {
            const stats = await fetchUserStats(addressId);
            return { ...stats, addressId };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Fetch top partners for a specific user
export const fetchTopPartnersAsync = createAsyncThunk(
    "stats/fetchPartners",
    async (addressId, thunkAPI) => {
        try {
            const partners = await fetchTopPartners(addressId);
            return partners;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        global: {
            topSpenders: [],
            mostActive: [],
            topMarkets: [],
            loading: false,
            error: null,
        },
        user: {
            totalVolume: 0,
            average: 0,
            count: 0,
            addressId: null,
            loading: false,
            error: null,
        },
        partners: {
            list: [],
            loading: false,
            error: null,
        },
    },
    reducers: {
        clearUserStats: (state) => {
            state.user = {
                totalVolume: 0,
                average: 0,
                count: 0,
                addressId: null,
                loading: false,
                error: null,
            };
            state.partners = {
                list: [],
                loading: false,
                error: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // Global stats
            .addCase(fetchGlobalStatsAsync.pending, (state) => {
                state.global.loading = true;
            })
            .addCase(fetchGlobalStatsAsync.fulfilled, (state, action) => {
                state.global.loading = false;
                state.global.topSpenders = action.payload.topSpenders || [];
                state.global.mostActive = action.payload.mostActive || [];
                state.global.topMarkets = action.payload.topMarkets || [];
            })
            .addCase(fetchGlobalStatsAsync.rejected, (state, action) => {
                state.global.loading = false;
                state.global.error = action.payload;
            })
            // User stats
            .addCase(fetchUserStatsAsync.pending, (state) => {
                state.user.loading = true;
            })
            .addCase(fetchUserStatsAsync.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.totalVolume = action.payload.totalVolume || 0;
                state.user.average = action.payload.average || 0;
                state.user.count = action.payload.count || 0;
                state.user.addressId = action.payload.addressId;
            })
            .addCase(fetchUserStatsAsync.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action.payload;
            })
            // Top partners
            .addCase(fetchTopPartnersAsync.pending, (state) => {
                state.partners.loading = true;
            })
            .addCase(fetchTopPartnersAsync.fulfilled, (state, action) => {
                state.partners.loading = false;
                state.partners.list = action.payload || [];
            })
            .addCase(fetchTopPartnersAsync.rejected, (state, action) => {
                state.partners.loading = false;
                state.partners.error = action.payload;
            });
    },
});

export const { clearUserStats } = statsSlice.actions;
export default statsSlice.reducer;
