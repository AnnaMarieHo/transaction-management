import React from "react";
import Badge from "./Badge";

const ReceiptTemplate = (props) => {
    const isSeller = props.variant === "seller";

    return (
        <div
            className={`relative p-4 sm:p-5 border-l-4 my-4 sm:my-7 ${
                isSeller ? "border-emerald-500" : "border-blue-500"
            } bg-white shadow-sm`}
        >
            <div className="flex justify-between items-start mb-2">
                <Badge variant={isSeller ? "green" : "blue"} size="sm">
                    {isSeller ? "Outgoing Sale" : "Incoming Sale"}
                </Badge>
                <span className="text-slate-400 text-[10px] sm:text-xs">
                    #{props.reciept_id}
                </span>
            </div>

            <div className="absolute top-2 right-2 text-[9px] sm:text-[10px] font-mono text-slate-300">
                REF: {props.reciept_id}
            </div>

            <div className="text-center mb-4 sm:mb-6">
                <h4 className="font-black text-lg sm:text-xl tracking-tighter text-slate-900 uppercase">
                    Receipt
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-500">
                    {props.sale_date}
                </p>
            </div>

            <div className="space-y-1 mb-4 sm:mb-6 text-xs sm:text-sm">
                <p className="font-bold text-slate-800">{props.seller_name}</p>
                <p className="text-slate-500 leading-tight">
                    {props.s_address} {props.s_room_num}
                    <br />
                    {props.s_city}, {props.s_state} {props.s_zip}
                </p>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-500 uppercase tracking-wider text-[9px] sm:text-[10px] font-bold">
                        Qty Items
                    </span>
                    <span className="font-mono">{props.num_items}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-500 uppercase tracking-wider text-[9px] sm:text-[10px] font-bold">
                        Max Price Point
                    </span>
                    <span className="font-mono">${props.highest_prices}</span>
                </div>

                <div className="border-t-2 border-slate-900 pt-2 sm:pt-3 mt-1.5 sm:mt-2 flex justify-between items-baseline">
                    <span className="font-black text-slate-900 uppercase text-xs sm:text-sm">
                        Total Amount
                    </span>
                    <span className="text-lg sm:text-xl font-black text-blue-600">
                        ${props.sale_total}
                    </span>
                </div>
            </div>

            <div className="mt-4 sm:mt-6 flex justify-center">
                <div className="h-1 w-full bg-[radial-gradient(circle,_#e2e8f0_1px,_transparent_1px)] bg-[length:8px_8px]" />
            </div>
        </div>
    );
};
export default ReceiptTemplate;
