import { createSelector } from "reselect";

/**
 * Address Selectors
 * Memoized selectors for address-related data
 */

// Base selectors (simple reads from state)
export const selectAddresses = (state) => state.addresses.addresses;
export const selectActiveId = (state) => state.addresses.ui.activeId;
export const selectEditingId = (state) => state.addresses.ui.editingId;
export const selectTransactionsForId = (state) =>
    state.addresses.ui.transactionsForId;
export const selectReceiptsFilter = (state) =>
    state.addresses.ui.receiptsFilter;
export const selectDeletingById = (state) => state.addresses.ui.deletingById;

// Memoized: Get a specific address by ID
export const selectAddressById = createSelector(
    [selectAddresses, (state, addressId) => addressId],
    (addresses, addressId) => {
        return addresses.find((a) => a.id === addressId);
    }
);

// Memoized: Get active address
export const selectActiveAddress = createSelector(
    [selectAddresses, selectActiveId],
    (addresses, activeId) => {
        if (!activeId) return null;
        return addresses.find((a) => a.id === activeId);
    }
);

// Memoized: Check if address is deleting
export const selectIsAddressDeleting = createSelector(
    [selectDeletingById, (state, addressId) => addressId],
    (deletingById, addressId) => {
        return Boolean(deletingById?.[addressId]);
    }
);

// Memoized: Get active address name
export const selectActiveAddressName = createSelector(
    [selectActiveAddress],
    (activeAddress) => {
        if (!activeAddress) return "";
        return `${activeAddress.first_name ?? ""} ${
            activeAddress.last_name ?? ""
        }`.trim();
    }
);
