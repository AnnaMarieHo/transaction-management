import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Receipts from "./Receipts";
import GlobalStats from "./GlobalStats";
import StatCard from "../molecules/StatCard";
import Label from "../atoms/Label";
import {
    selectActiveId,
    selectActiveAddressName,
    selectReceipts,
} from "../../store/selectors";
import {
    fetchUserStatsAsync,
    fetchGlobalStatsAsync,
    fetchTopPartnersAsync,
    clearUserStats,
} from "../../store/slices/statsSlice";

const DashboardStats = () => {
    const dispatch = useDispatch();

    const activeId = useSelector(selectActiveId);
    const activeName = useSelector(selectActiveAddressName);
    const receipts = useSelector(selectReceipts);

    const userStats = useSelector((state) => state.stats.user);
    const globalStats = useSelector((state) => state.stats.global);

    // Fetch stats when activeId changes
    useEffect(() => {
        if (activeId) {
            dispatch(fetchUserStatsAsync(activeId));
            dispatch(fetchTopPartnersAsync(activeId));
        } else {
            dispatch(clearUserStats());
            dispatch(fetchGlobalStatsAsync());
        }
    }, [activeId, dispatch]);

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
                    <div className="text-slate-400 dark:text-slate-500 animate-pulse">
                        Loading stats...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {activeId ? (
                            <>
                                <StatCard
                                    title="Total Volume"
                                    value={`$${Number(
                                        userStats.totalVolume || 0
                                    ).toLocaleString()}`}
                                    variant="blue"
                                />
                                <StatCard
                                    title="Avg. Transaction"
                                    value={`$${Number(
                                        userStats.average || 0
                                    ).toFixed(2)}`}
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
                        <Receipts activeId={activeId} activeName={activeName} />
                    </div>
                ) : (
                    <div className="transition-opacity duration-200">
                        <GlobalStats />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardStats;
