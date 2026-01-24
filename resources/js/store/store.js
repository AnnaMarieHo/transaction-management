import { configureStore } from "@reduxjs/toolkit";
import {addressSlice} from "./slices/addressSlice";


const store = configureStore({
    reducer: {
        addresses: addressSlice.reducer
    }
})

export default store