import React, { useEffect, useState } from "react";
import ReceiptTemplate from "../atoms/ReceiptTemplate";
import { useReceipt } from "../../hooks/useReceipt";

const Receipts = () => {
    const { receipts, loading } = useReceipt();

    if (loading) return <div>Loading...</div>;

    const receiptsExist = Object.values(receipts).length > 0;

    const first = receipts[0];

    return (
        <div className="flex flex-col max-w-[35rem] p-5">
            {!receiptsExist ? (
                <div>No Receipts</div>
            ) : (
                <ReceiptTemplate
                    receiptId={first.reciept_id}
                    name={first.seller_name}
                    saleDate={first.sale_date}
                    address={first.s_address}
                    roomNum={first.s_room_num}
                    city={first.s_city}
                    state={first.s_state}
                    zip={first.s_zip}
                    numItems={first.num_items}
                    highestPrice={first.highest_prices}
                    total={first.sale_total}
                />
            )}
        </div>
    );
};

export default Receipts;
