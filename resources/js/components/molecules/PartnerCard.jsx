import React from "react";
import Avatar from "../atoms/Avatar";
import Badge from "../atoms/Badge";

const PartnerCard = ({ partner, rank, className = "" }) => {
    const { name, company, totalValue, buys, sells } = partner;

    return (
        <div
            className={`flex items-center justify-between p-4 bg-slate-50 rounded-2xl ${className}`}
        >
            <div className="flex items-center gap-4">
                <Avatar initials={name?.charAt(0)} variant="white" />
                <div>
                    {company && (
                        <p className="text-[10px] font-bold text-blue-500 uppercase">
                            {company}
                        </p>
                    )}
                    <p className="text-sm font-black text-slate-800">{name}</p>
                    {(buys > 0 || sells > 0) && (
                        <div className="flex gap-2 mt-1">
                            {buys > 0 && (
                                <Badge variant="blue" size="sm">
                                    {buys} Buys
                                </Badge>
                            )}
                            {sells > 0 && (
                                <Badge variant="green" size="sm">
                                    {sells} Sells
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-black text-slate-900">
                    ${totalValue.toLocaleString()}
                </p>
                {rank && (
                    <Badge variant="default" size="sm" className="mt-1">
                        #{rank}
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default PartnerCard;
