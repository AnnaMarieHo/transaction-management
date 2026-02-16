import { createSelector } from "reselect";
import { selectAddresses } from "./addressSelectors";
import { calculatePercentDiff } from "../../utils/receiptUtils";

/**
 * Receipt Selectors
 * Memoized selectors for receipt-related data and calculations
 */

// Base selectors
export const selectReceipts = (state) => state.receipts.receipts;
export const selectReceiptsLoading = (state) => state.receipts.loading;
export const selectReceiptsError = (state) => state.receipts.error;

// Memoized: Get receipts for a specific address (buyer/seller breakdown)
export const selectReceiptsForAddress = createSelector(
    [selectReceipts, (state, addressId) => addressId],
    (receipts, addressId) => {
        const buyerReceipts = receipts.filter((r) => r.b_id === addressId);
        const sellerReceipts = receipts.filter((r) => r.s_id === addressId);

        return {
            buyerReceipts,
            sellerReceipts,
            numberTransactions: buyerReceipts.length + sellerReceipts.length,
        };
    }
);

