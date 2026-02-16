import { createSelector } from "reselect";
import { selectActiveId, selectAddresses } from "./addressSelectors";
import { calculatePercentDiff } from "../../utils/receiptUtils";

/**
 * Receipt Selectors
 * Memoized selectors for receipt-related data and calculations
 */

// Base selectors
export const selectReceipts = (state) => state.receipts.receipts;
export const selectReceiptsLoading = (state) => state.receipts.loading;
export const selectReceiptsError = (state) => state.receipts.error;

// Memoized: Filter receipts by user (as buyer OR seller)
export const selectFilteredReceipts = createSelector(
    [selectReceipts, selectActiveId],
    (receipts, activeId) => {
        if (!activeId) return [];
        return receipts.filter(
            (r) => r.b_id === activeId || r.s_id === activeId
        );
    }
);

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

// Memoized: Get transaction items with calculated stats
export const selectTransactionItems = createSelector(
    [selectFilteredReceipts, selectActiveId],
    (filteredReceipts, activeId, userAverage) => {
        return filteredReceipts.slice(0, 5).map((r) => {
            const isBuying = r.b_id === activeId;
            const isAboveAverage = r.sale_total > userAverage;
            const percentDiff = calculatePercentDiff(r.sale_total, userAverage);

            return {
                receiptId: r.reciept_id,
                amount: r.sale_total,
                isBuying,
                percentDiff,
                isAboveAverage,
            };
        });
    }
);

// Memoized: Get display receipts (active user or all)
export const selectDisplayReceipts = createSelector(
    [selectReceipts, selectFilteredReceipts, selectActiveId],
    (allReceipts, filteredReceipts, activeId) => {
        return activeId ? filteredReceipts : allReceipts;
    }
);
