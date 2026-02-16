import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReceipts } from "../../services/receiptService";

export const fetchReceiptsAsync = createAsyncThunk(
    "receipts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const data = await fetchReceipts();
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const receiptSlice = createSlice({
    name: "receipts",
    initialState: {
        receipts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceiptsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReceiptsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.receipts = action.payload;
            })
            .addCase(fetchReceiptsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default receiptSlice.reducer;
