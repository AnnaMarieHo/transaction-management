import React from "react";

const Divider = ({ orientation = "horizontal", className = "" }) => {
    const orientationClasses = {
        horizontal: "h-[1px] w-full",
        vertical: "w-[1px] h-full",
    };

    return (
        <div
            className={`bg-slate-100 ${orientationClasses[orientation]} ${className}`}
        />
    );
};

export default Divider;
