import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const STORAGE_KEY = "receipts-night-mode";

const ThemeContext = createContext(null);

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
};

export const ThemeProvider = ({ children }) => {
    const [isNightMode, setIsNightMode] = useState(() => {
        if (typeof window === "undefined") return false;
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "false");
        } catch {
            return false;
        }
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isNightMode);
    }, [isNightMode]);

    const toggleNightMode = useCallback(() => {
        setIsNightMode((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch (_) {}
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ isNightMode, toggleNightMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
