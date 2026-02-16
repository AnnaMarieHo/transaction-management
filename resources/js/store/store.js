import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./slices/addressSlice";
import statsReducer from "./slices/statsSlice";
import receiptReducer from "./slices/recieptSlice";

const store = configureStore({
    reducer: {
        addresses: addressSlice.reducer,
        receipts: receiptReducer,
        stats: statsReducer,
    },
});

export default store;
