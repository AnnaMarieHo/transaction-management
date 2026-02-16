import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeTransactions,
    setReceiptsFilter,
} from "../../store/slices/addressSlice";
import ReceiptDrawer from "./ReceiptDrawer";
import ReceiptDrawerButtons from "../atoms/ReceiptDrawerButtons";
import ReceiptTemplate from "../atoms/ReceiptTemplate";
import {
    selectAddressById,
    selectTransactionsForId,
    selectReceiptsFilter,
    selectReceiptsForAddress,
} from "../../store/selectors";

const AddressTransactionsDrawer = () => {
    const dispatch = useDispatch();

    const transactionsForId = useSelector(selectTransactionsForId);
    const receiptsFilter = useSelector(selectReceiptsFilter);
    const address = useSelector((state) =>
        selectAddressById(state, transactionsForId)
    );
    const { buyerReceipts, sellerReceipts, numberTransactions } = useSelector(
        (state) => selectReceiptsForAddress(state, transactionsForId)
    );

    const title = address
        ? `Transaction Records — ${address.first_name ?? ""} ${
              address.last_name ?? ""
          }`.trim()
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
                    <div className="text-center py-20 text-slate-400 dark:text-slate-500">
                        <p>No transaction history found for this address.</p>
                    </div>
                )}
            </div>
        </ReceiptDrawer>
    );
};

export default AddressTransactionsDrawer;
