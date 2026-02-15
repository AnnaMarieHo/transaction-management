import React from "react";
import Avatar from "./Avatar";

const AddressCollapsed = ({ addresses }) => {
    const initials = `${addresses.first_name?.[0] || ""}${
        addresses.last_name?.[0] || ""
    }`;
    return (
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 animate-in fade-in duration-300">
            <Avatar initials={initials} className="hidden xs:flex sm:flex" />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {addresses.first_name} {addresses.last_name}
                    <span className="ml-1 sm:ml-2 font-normal text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                        {addresses.company && `• ${addresses.company}`}
                    </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                    {addresses.address_line1}, {addresses.city}
                </p>
            </div>
            <div className="text-slate-300 dark:text-slate-500 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors flex-shrink-0">
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
};
export default AddressCollapsed;
