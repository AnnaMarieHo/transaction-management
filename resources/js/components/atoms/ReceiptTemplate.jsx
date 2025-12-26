import React from "react";

const ReceiptTemplate = (props) => {
    return (
        /* The "Receipt Paper" look */
        <div className="bg-white p-6 shadow-md border-t-4 border-blue-500 relative">
            {/* Corner ID Tag */}
            <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-300">
                REF: {props.reciept_id}
            </div>

            <div className="text-center mb-6">
                <h4 className="font-black text-xl tracking-tighter text-slate-900 uppercase">
                    Receipt
                </h4>
                <p className="text-xs text-slate-500">{props.sale_date}</p>
            </div>

            <div className="space-y-1 mb-6 text-sm">
                <p className="font-bold text-slate-800">{props.seller_name}</p>
                <p className="text-slate-500 leading-tight">
                    {props.s_address} {props.s_room_num}
                    <br />
                    {props.s_city}, {props.s_state} {props.s_zip}
                </p>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                        Qty Items
                    </span>
                    <span className="font-mono">{props.num_items}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                        Max Price Point
                    </span>
                    <span className="font-mono">${props.highest_prices}</span>
                </div>

                <div className="border-t-2 border-slate-900 pt-3 mt-2 flex justify-between items-baseline">
                    <span className="font-black text-slate-900 uppercase">
                        Total Amount
                    </span>
                    <span className="text-xl font-black text-blue-600">
                        ${props.sale_total}
                    </span>
                </div>
            </div>

            {/* Bottom Decorative Edge */}
            <div className="mt-6 flex justify-center">
                <div className="h-1 w-full bg-[radial-gradient(circle,_#e2e8f0_1px,_transparent_1px)] bg-[length:8px_8px]" />
            </div>
        </div>
    );
};
export default ReceiptTemplate;
