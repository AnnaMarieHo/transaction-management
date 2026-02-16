// resources/js/components/organisms/DashboardStats.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Receipts from "./Receipts";
// import GlobalStats from "./GlobalStats";
import StatCard from "../molecules/StatCard";
import Label from "../atoms/Label";
import {
    fetchUserStatsAsync,
    fetchGlobalStatsAsync,
    clearUserStats,
} from "../../store/slices/statsSlice";

const DashboardStats = ({ receipts, addresses, activeId }) => {
    const dispatch = useDispatch();

    // Get stats from Redux (no prop drilling!)
    const userStats = useSelector((state) => state.stats.user);
    const globalStats = useSelector((state) => state.stats.global);

    const activePerson = addresses?.find((a) => a.id === activeId);
    const activeName = activePerson
        ? `${activePerson.first_name ?? ""} ${activePerson.last_name}`
        : "";

    // Watch activeId and fetch stats automatically
    useEffect(() => {
        if (activeId) {
            dispatch(fetchUserStatsAsync(activeId));
        } else {
            dispatch(clearUserStats());
            dispatch(fetchGlobalStatsAsync());
        }
    }, [activeId, dispatch]);

    const filteredReceipts = activeId
        ? receipts.filter((r) => r.b_id === activeId || r.s_id === activeId)
        : [];

    const displayStats = activeId ? userStats : globalStats;
    const isLoading = activeId ? userStats.loading : globalStats.loading;

    return (
        <div className="space-y-6 sm:space-y-8 mx-auto p-3 sm:p-4 lg:p-6 text-slate-900 dark:text-slate-100">
            <header>
                {activeName && (
                    <Label className="mb-3 sm:mb-4 ml-1 sm:ml-2">
                        {activeName}
                    </Label>
                )}

                {isLoading ? (
                    <div className="text-slate-400 animate-pulse">
                        Loading stats...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {activeId ? (
                            <>
                                <StatCard
                                    title="Total Volume"
                                    value={`$${userStats.totalVolume.toLocaleString()}`}
                                    variant="blue"
                                />
                                <StatCard
                                    title="Avg. Transaction"
                                    value={`$${userStats.average.toFixed(2)}`}
                                    variant="green"
                                />
                            </>
                        ) : (
                            <StatCard
                                title="Total Transactions"
                                value={receipts.length}
                                variant="blue"
                            />
                        )}
                    </div>
                )}
            </header>

            <div className="flex flex-col space-y-6 sm:space-y-8">
                {activeId ? (
                    <div className="transition-opacity duration-200">
                        <Receipts
                            receipts={receipts}
                            filteredReceipts={filteredReceipts}
                            activeId={activeId}
                            addresses={addresses}
                            activeName={activeName}
                        />
                    </div>
                ) : (
                    <div className="transition-opacity duration-200">
                        {/* <GlobalStats
                            addresses={addresses}
                            receipts={receipts}
                        /> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardStats;
