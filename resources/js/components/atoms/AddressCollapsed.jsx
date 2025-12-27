import React from "react";
const AddressCollapsed = ({ addresses }) => {
    const initials = `${addresses.first_name?.[0] || ""}${
        addresses.last_name?.[0] || ""
    }`;
    return (
        <div className="flex items-center gap-4 animate-in fade-in duration-300">
            <div className="h-15 w-15 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                {initials.toUpperCase() || "AD"}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-800 truncate">
                    {addresses.first_name} {addresses.last_name}
                    <span className="ml-2 font-normal text-slate-400">
                        {addresses.company && `• ${addresses.company}`}
                    </span>
                </h3>
                <p className="text-xs text-slate-500 truncate">
                    {addresses.address_line1}, {addresses.city}
                </p>
            </div>
            <div className="text-slate-300 group-hover:text-blue-400 transition-colors px-2">
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
