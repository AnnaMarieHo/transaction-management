// resources/js/store/slices/statsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchGlobalStats,
    fetchUserStats,
    // fetchUserPartners,
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
            // const [stats, partners] = await Promise.all([
            //     fetchUserStats(addressId),
            //     fetchUserPartners(addressId),
            // ]);
            const stats = await Promise.all([fetchUserStats(addressId)]);
            return { ...stats, partnerships: partners, addressId };
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
            markets: [],
            loading: false,
            error: null,
        },
        user: {
            totalVolume: 0,
            average: 0,
            count: 0,
            partnerships: [],
            addressId: null,
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
                partnerships: [],
                addressId: null,
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
                state.global.markets = action.payload.markets || [];
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
                state.user.partnerships = action.payload.partnerships || [];
                state.user.addressId = action.payload.addressId;
            })
            .addCase(fetchUserStatsAsync.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action.payload;
            });
    },
});

export const { clearUserStats } = statsSlice.actions;
export default statsSlice.reducer;
