import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Receipts from "./Receipts";
import GlobalStats from "./GlobalStats";
import StatCard from "../molecules/StatCard";
import Label from "../atoms/Label";
import { selectReceipts, selectAddressById } from "../../store/selectors";
import {
    fetchUserStatsAsync,
    fetchGlobalStatsAsync,
    fetchTopPartnersAsync,
    clearUserStats,
} from "../../store/slices/statsSlice";

const DashboardStats = ({ activeId }) => {
    const dispatch = useDispatch();

    const activeAddress = useSelector((state) =>
        selectAddressById(state, activeId),
    );
    const receipts = useSelector(selectReceipts);

    const userStats = useSelector((state) => state.stats.user);
    const globalStats = useSelector((state) => state.stats.global);

    // Generate active name from address
    const activeName = activeAddress
        ? `${activeAddress.first_name ?? ""} ${
              activeAddress.last_name ?? ""
          }`.trim()
        : "";

    // Fetch stats when activeId changes
    useEffect(() => {
        dispatch(fetchGlobalStatsAsync());
        consosle.log(globalStats);
    }, [dispatch]);

    return (
        <div className="space-y-6 sm:space-y-8 mx-auto p-3 sm:p-4 lg:p-6 text-slate-900 dark:text-slate-100">
            <header>
                {isLoading ? (
                    <div className="text-slate-400 dark:text-slate-500">
                        Loading stats...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <StatCard
                            title="Total Transactions"
                            value={receipts.length}
                            variant="blue"
                        />
                    </div>
                )}
            </header>

            <div className="flex flex-col space-y-6 sm:space-y-8">
                <div className="">
                    <GlobalStats />
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
