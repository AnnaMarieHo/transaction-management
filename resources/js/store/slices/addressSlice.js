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
    name: "addresses",
    initialState: {
        addresses: [],
        loading: false,
        isFetching: false,
        isError: false,
        errorMessage: "",
        ui: {
            activeId: null,
            editingId: null,
            transactionsForId: null,
            receiptsFilter: "All",
            deletingById: {},
        },
    },

    reducers: {
        updateAddress: (state, action) => {
            const {id, name, value} = action.payload;
            const existingAddress = state.addresses.find(address => address.id === id)
            if (existingAddress){
                existingAddress[name] = value;
            }
        },
        toggleActiveId: (state, action) => {
            const id = action.payload;
            // Don't allow switching active cards while editing
            if (state.ui.editingId !== null) return;
            const nextActiveId = state.ui.activeId === id ? null : id;
            state.ui.activeId = nextActiveId;
            // If we collapse/switch cards, close any open transactions drawer
            if (state.ui.transactionsForId !== null && state.ui.transactionsForId !== nextActiveId) {
                state.ui.transactionsForId = null;
                state.ui.receiptsFilter = "All";
            }
        },
        toggleEditingId: (state, action) => {
            const id = action.payload;
            // Enter/exit edit mode; ensure the editing card is active
            state.ui.editingId = state.ui.editingId === id ? null : id;
            if (state.ui.editingId !== null) {
                state.ui.activeId = id;
            }
        },
        stopEditing: (state) => {
            state.ui.editingId = null;
        },
        openTransactions: (state, action) => {
            const id = action.payload;
            state.ui.transactionsForId = id;
        },
        closeTransactions: (state) => {
            state.ui.transactionsForId = null;
            state.ui.receiptsFilter = "All";
        },
        setReceiptsFilter: (state, action) => {
            state.ui.receiptsFilter = action.payload;
        },
        markDeleting: (state, action) => {
            const id = action.payload;
            state.ui.deletingById[id] = true;
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
            // After a successful save, exit edit mode
            state.ui.editingId = null;
        })
        .addCase(editAddress.pending, (state) => {
            state.isFetching = true
        })
        .addCase(deleteAddress.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.isFetching = false;
            const deletedId = action.meta.arg;
            state.addresses = state.addresses.filter(item => item.id !== deletedId);
            if (state.ui.activeId === deletedId) state.ui.activeId = null;
            if (state.ui.editingId === deletedId) state.ui.editingId = null;
            if (state.ui.transactionsForId === deletedId) {
                state.ui.transactionsForId = null;
                state.ui.receiptsFilter = "All";
            }
            delete state.ui.deletingById[deletedId];
        })
    }

})

export const {
    updateAddress,
    toggleActiveId,
    toggleEditingId,
    stopEditing,
    openTransactions,
    closeTransactions,
    setReceiptsFilter,
    markDeleting,
} = addressSlice.actions