import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTransactions, setReceiptsFilter } from "../../store/slices/addressSlice";
import { useReceipt } from "../../hooks/useReceipt";
import ReceiptDrawer from "./ReceiptDrawer";
import ReceiptDrawerButtons from "../atoms/ReceiptDrawerButtons";
import ReceiptTemplate from "../atoms/ReceiptTemplate";

const AddressTransactionsDrawer = () => {
    const dispatch = useDispatch();
    const { receipts } = useReceipt();
    const { transactionsForId, receiptsFilter } = useSelector(
        (state) => state.addresses.ui
    );
    const addresses = useSelector((state) => state.addresses.addresses);

    const address = useMemo(() => {
        if (!transactionsForId) return null;
        return addresses.find((a) => a.id === transactionsForId) ?? null;
    }, [addresses, transactionsForId]);

    const { buyerReceipts, sellerReceipts, numberTransactions } = useMemo(() => {
        if (!transactionsForId) {
            return { buyerReceipts: [], sellerReceipts: [], numberTransactions: 0 };
        }
        const buyerReceipts = receipts.filter((r) => r.b_id === transactionsForId);
        const sellerReceipts = receipts.filter((r) => r.s_id === transactionsForId);
        return {
            buyerReceipts,
            sellerReceipts,
            numberTransactions: buyerReceipts.length + sellerReceipts.length,
        };
    }, [receipts, transactionsForId]);

    const title = address
        ? `Transaction Records — ${address.first_name ?? ""} ${address.last_name ?? ""}`.trim()
        : "Transaction Records";

    return (
        <ReceiptDrawer
            isOpen={transactionsForId !== null}
            onClose={() => dispatch(closeTransactions())}
            title={title}
        >
            <ReceiptDrawerButtons
                onFilterChange={(filter) => dispatch(setReceiptsFilter(filter))}
                currentFilter={receiptsFilter}
            />

            <div className="mt-6 space-y-6">
                {(receiptsFilter === "All" || receiptsFilter === "Incoming") &&
                    buyerReceipts.map((receipt) => (
                        <ReceiptTemplate
                            key={receipt.reciept_id}
                            variant="buyer"
                            {...receipt}
                        />
                    ))}

                {(receiptsFilter === "All" || receiptsFilter === "Outgoing") &&
                    sellerReceipts.map((receipt) => (
                        <ReceiptTemplate
                            key={receipt.reciept_id}
                            variant="seller"
                            {...receipt}
                        />
                    ))}

                {transactionsForId !== null && numberTransactions === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <p>No transaction history found for this address.</p>
                    </div>
                )}
            </div>
        </ReceiptDrawer>
    );
};

export default AddressTransactionsDrawer;

