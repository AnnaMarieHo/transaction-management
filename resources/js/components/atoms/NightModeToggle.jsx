import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import IconButton from "./IconButton";

const NightModeToggle = ({ className = "" }) => {
    const { isNightMode, toggleNightMode } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleNightMode}
            aria-label={
                isNightMode ? "Switch to light mode" : "Switch to night mode"
            }
            className={`
                flex items-center justify-center rounded-full p-2
                text-slate-500 hover:text-amber-500 hover:bg-amber-50
                dark:text-slate-400 dark:hover:text-amber-400 dark:hover:bg-amber-500/10
                transition-colors duration-200
                ${className}
            `}
        >
            {isNightMode ? (
                <FaSun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
                <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
        </button>
    );
};

export default NightModeToggle;
