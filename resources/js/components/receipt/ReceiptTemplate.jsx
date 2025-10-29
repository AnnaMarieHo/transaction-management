import React from "react";

const ReceiptTemplate = ({
    receiptId,
    name,
    saleDate,
    address,
    roomNum,
    city,
    state,
    zip,
    numItems,
    highestPrice,
    total,
}) => {
    return (
        <div className="m-4 pb-10 p-5 shadow-2xl border border-neutral-300 shadow-black/20 m-6 rounded-md ">
            <div className="flex flex-row">
                <div>({receiptId})</div>
            </div>
            <div className="flex items-center flex-col ">
                <div className="flex flex-row mb-1">
                    <p className="font-bold">SALE</p>
                </div>
                <div className="flex flex-row mb-3">
                    <div className="font-semibold ">{name}</div>
                </div>
                <div className="items-center content-center flex">
                    {saleDate}
                </div>

                <div className="flex flex-row">
                    <div>
                        {address} {!roomNum ? "" : roomNum}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        {city} {state} {zip}
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div>----------------------------------</div>
                    <div className="flex w-full justify-between">
                        <div>ITEMS: </div>
                        <div>{numItems}</div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div>HIGHEST PRICE: </div>
                        <div>${highestPrice}</div>
                    </div>
                    <div>----------------------------------</div>
                    <div className="flex w-full justify-between">
                        <div>TOTAL: </div>
                        <div>${total}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReceiptTemplate;
