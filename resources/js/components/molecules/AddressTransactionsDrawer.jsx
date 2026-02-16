import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ReceiptDrawer from "./ReceiptDrawer";
import ReceiptDrawerButtons from "../atoms/ReceiptDrawerButtons";
import ReceiptTemplate from "../atoms/ReceiptTemplate";
import {
    selectAddressById,
    selectReceiptsForAddress,
} from "../../store/selectors";

const AddressTransactionsDrawer = ({ isOpen, addressId, onClose }) => {
    const [receiptsFilter, setReceiptsFilter] = useState("All");

    const address = useSelector((state) =>
        selectAddressById(state, addressId)
    );
    const { buyerReceipts, sellerReceipts, numberTransactions } = useSelector(
        (state) => selectReceiptsForAddress(state, addressId)
    );

    const title = address
        ? `Transaction Records — ${address.first_name ?? ""} ${
              address.last_name ?? ""
          }`.trim()
        : "Transaction Records";

    const handleClose = () => {
        setReceiptsFilter("All");
        onClose();
    };

    return (
        <ReceiptDrawer
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
        >
            <ReceiptDrawerButtons
                onFilterChange={setReceiptsFilter}
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

                {isOpen && numberTransactions === 0 && (
                    <div className="text-center py-20 text-slate-400 dark:text-slate-500">
                        <p>No transaction history found for this address.</p>
                    </div>
                )}
            </div>
        </ReceiptDrawer>
    );
};

export default AddressTransactionsDrawer;
