/**
 * Receipt Calculation Utilities
 * Business logic for receipt analysis and statistics
 */

/**
 * Calculate average of receipt sale totals
 */
export const calculateReceiptAverage = (receipts) => {
    if (!receipts || receipts.length === 0) return 0;
    const total = receipts.reduce((sum, r) => sum + r.sale_total, 0);
    return total / receipts.length;
};

/**
 * Calculate total volume from receipts
 */
export const calculateTotalVolume = (receipts) => {
    if (!receipts || receipts.length === 0) return 0;
    return receipts.reduce((sum, r) => sum + r.sale_total, 0);
};

/**
 * Calculate percentage difference from average
 */
export const calculatePercentDiff = (value, average) => {
    if (average === 0) return 0;
    const rawDiff = ((value - average) / average) * 100;
    return Math.min(Math.abs(rawDiff), 100).toFixed(0);
};

/**
 * Build partner interaction data from receipts
 * Groups receipts by partner and aggregates buy/sell data
 */
export const buildPartnerInteractionData = (receipts, activeId, addresses) => {
    return receipts.reduce((acc, r) => {
        const isBuying = r.b_id === activeId;
        const partnerId = isBuying ? r.s_id : r.b_id;
        const partnerName = isBuying ? r.seller_name : r.buyer_name;

        const partnerObj = addresses?.find((a) => a.id === partnerId);
        const companyName = partnerObj?.company;

        if (!acc[partnerId]) {
            acc[partnerId] = {
                name: partnerName,
                company: companyName,
                buys: 0,
                sells: 0,
                totalValue: 0,
            };
        }

        acc[partnerId].totalValue += r.sale_total;
        if (isBuying) acc[partnerId].buys += 1;
        else acc[partnerId].sells += 1;

        return acc;
    }, {});
};

/**
 * Get top N partners by total value
 */
export const getTopPartners = (interactionData, limit = 3) => {
    return Object.values(interactionData)
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, limit);
};

/**
 * Calculate top spenders from addresses and receipts
 */
export const calculateTopSpenders = (addresses, receipts, limit = 3) => {
    return addresses
        .map((addr) => {
            const userReceipts = receipts.filter((r) => r.b_id === addr.id);
            const total = userReceipts.reduce(
                (sum, r) => sum + r.sale_total,
                0
            );
            return {
                name: addr.first_name,
                total,
                avg:
                    userReceipts.length > 0
                        ? (total / userReceipts.length).toFixed(0)
                        : 0,
                items: userReceipts.reduce(
                    (sum, r) => sum + (r.num_items || 0),
                    0
                ),
            };
        })
        .filter((user) => user.total > 0)
        .sort((a, b) => b.total - a.total)
        .slice(0, limit);
};

/**
 * Calculate most active users by transaction count
 */
export const calculateMostActive = (addresses, receipts, limit = 3) => {
    return addresses
        .map((addr) => {
            const count = receipts.filter(
                (r) => r.b_id === addr.id || r.s_id === addr.id
            ).length;
            const value = receipts
                .filter((r) => r.b_id === addr.id || r.s_id === addr.id)
                .reduce((sum, r) => sum + r.sale_total, 0);
            return { name: addr.last_name, count, value };
        })
        .filter((user) => user.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

/**
 * Calculate city volume distribution
 */
export const calculateCityVolume = (receipts) => {
    return receipts.reduce((acc, r) => {
        const city = r.b_city?.replace("_", " ") || "Other";
        acc[city] = (acc[city] || 0) + r.sale_total;
        return acc;
    }, {});
};

/**
 * Get top markets by volume with market share percentage
 */
export const getTopMarkets = (cityVolume, totalVolume, limit = 3) => {
    return Object.entries(cityVolume)
        .map(([name, total]) => ({
            name,
            total,
            share:
                totalVolume > 0 ? ((total / totalVolume) * 100).toFixed(1) : 0,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limit);
};

/**
 * Filter receipts for a specific user (as buyer or seller)
 */
export const filterReceiptsByUser = (receipts, userId) => {
    return receipts.filter((r) => r.b_id === userId || r.s_id === userId);
};
