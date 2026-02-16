import React from "react";
import AddressCard from "../organisms/AddressCard";
import NightModeToggle from "../atoms/NightModeToggle";
import ErrorBoundary from "../atoms/ErrorBoundary";
import { useSelector } from "react-redux";
import { selectAddresses } from "../../store/selectors";

const ListAddresses = () => {
    const addresses = useSelector(selectAddresses);

    return (
        <>
            <div className="bg-slate-50 dark:bg-slate-800/50 min-h-screen py-12 px-4">
                <div className="flex-col flex w-full max-w-lg mx-auto space-y-8">
                    <div className="px-2 flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                All Clients
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Select a client to edit or manage details.
                            </p>
                        </div>
                        <NightModeToggle className="hidden lg:flex flex-shrink-0" />
                    </div>

                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <ErrorBoundary
                                key={address.id}
                                errorMessage="This client card encountered an error."
                            >
                                <AddressCard addressId={address.id} />
                            </ErrorBoundary>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default React.memo(ListAddresses);
