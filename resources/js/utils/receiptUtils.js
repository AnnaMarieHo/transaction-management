export const calculatePercentDiff = (value, average) => {
    if (average === 0) return 0;
    const rawDiff = ((value - average) / average) * 100;
    return Math.min(Math.abs(rawDiff), 100).toFixed(0);
};
