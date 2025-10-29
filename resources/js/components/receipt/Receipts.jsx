import React, { useEffect, useState } from "react";
import ReceiptTemplate from "./ReceiptTemplate";
import { useReceiptContext } from "../../contexts/ReceiptContext";

const Receipts = () => {
    const { receipts, loading } = useReceiptContext();

    if (loading) return <div>Loading ...</div>;

    const first = receipts[0];
    const second = receipts[1];

    return (
        <div className="flex flex-col max-w-[35rem] p-5">
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
            <ReceiptTemplate
                receiptId={second.reciept_id}
                name={second.seller_name}
                saleDate={second.sale_date}
                address={second.s_address}
                roomNum={second.s_room_num}
                city={second.s_city}
                state={second.s_state}
                zip={second.s_zip}
                numItems={second.num_items}
                highestPrice={second.highest_prices}
                total={second.sale_total}
            />
        </div>
    );
};

export default Receipts;
