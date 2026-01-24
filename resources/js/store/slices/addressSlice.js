import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddressService } from "../../services/addressService";


export const fetchAddresses = createAsyncThunk(
    'addresses/fetchAll',
    async (_, thunkAPI) => {
        try{
            const response = await AddressService.fetchAddress();
            return Array.isArray(response) ? response : [];
        }catch(e){
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const editAddress = createAsyncThunk(
    'addresses/edit',
    async (editData, thunkAPI) => {
        try {
            const response = await AddressService.editAddress(editData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const addAddress = createAsyncThunk(
    'addresses/add',
    async (formData, thunkAPI) => {
        try{
            const response = await AddressService.addAddress(formData)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const deleteAddress = createAsyncThunk(
    'addresses/delete',
    async (id, thunkAPI) => {
        try {
            const response = await AddressService.deleteAddress(id)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const addressSlice = createSlice({
    name: "addreses",
    initialState: {
        addresses: [],
        loading: false,
        isFetching: false,
        isError: false,
        errorMessage: "",
    },

    reducers: {
        updateAddress: (state, action) => {
            const {id, name, value} = action.payload;
            const existingAddress = state.addresses.find(address => address.id === id)
            if (existingAddress){
                existingAddress[name] = value;
            }
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchAddresses.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(fetchAddresses.fulfilled, (state, action) => {
            state.isFetching = false;
            state.addresses = action.payload;
        })
        .addCase(fetchAddresses.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true
            state.errorMessage = action.payload;
        })
        .addCase(addAddress.fulfilled, (state, action) => {
            state.addresses.unshift(action.payload);
            state.isFetching = false;
        })
        .addCase(addAddress.pending, (state) => {
            state.isFetching = true
        })
        .addCase(editAddress.fulfilled, (state, action) => {
            state.isFetching = false;
            const idx = state.addresses.findIndex(item => item.id === action.payload.id);
            if(idx !== -1){
                state.addresses[idx] = action.payload
            }
        })
        .addCase(editAddress.pending, (state) => {
            state.isFetching = true
        })
        .addCase(deleteAddress.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.isFetching = false;
            state.addresses = state.addresses.filter(item => item.id !== action.meta.arg);
        })
    }

})

export const {updateAddress} = addressSlice.actions