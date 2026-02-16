import { createSelector } from "reselect";

/**
 * Address Selectors
 * Memoized selectors for address-related data
 */

// Base selectors (simple reads from state)
export const selectAddresses = (state) => state.addresses.addresses;

// Memoized: Get a specific address by ID
export const selectAddressById = createSelector(
    [selectAddresses, (state, addressId) => addressId],
    (addresses, addressId) => {
        return addresses.find((a) => a.id === addressId);
    }
);
