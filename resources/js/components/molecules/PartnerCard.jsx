import React from "react";
import Avatar from "../atoms/Avatar";
import Badge from "../atoms/Badge";

const PartnerCard = ({ partner, rank, className = "" }) => {
    const { name, company, totalValue, buys, sells } = partner;

    return (
        <div
            className={`flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 lg:p-4 bg-slate-50 rounded-xl sm:rounded-2xl ${className}`}
        >
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                <Avatar
                    initials={name?.charAt(0)}
                    variant="white"
                    className="hidden sm:flex"
                />
                <div className="min-w-0 flex-1">
                    {company && (
                        <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold text-blue-500 uppercase truncate">
                            {company}
                        </p>
                    )}
                    <p className="text-xs sm:text-sm lg:text-base font-black text-slate-800 truncate">
                        {name}
                    </p>
                    {(buys > 0 || sells > 0) && (
                        <div className="flex gap-1 sm:gap-1.5 lg:gap-2 mt-0.5 sm:mt-1">
                            {buys > 0 && (
                                <Badge variant="blue" size="sm">
                                    <span className="sm:hidden">{buys}B</span>
                                    <span className="hidden sm:inline">
                                        {buys} Buys
                                    </span>
                                </Badge>
                            )}
                            {sells > 0 && (
                                <Badge variant="green" size="sm">
                                    <span className="sm:hidden">{sells}S</span>
                                    <span className="hidden sm:inline">
                                        {sells} Sells
                                    </span>
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right flex-shrink-0 flex flex-col items-end gap-0.5 sm:gap-1">
                <p className="text-sm sm:text-base lg:text-lg font-black text-slate-900">
                    ${totalValue.toLocaleString()}
                </p>
                {rank && (
                    <Badge variant="default" size="sm">
                        #{rank}
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default PartnerCard;
