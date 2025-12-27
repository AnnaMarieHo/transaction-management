import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

const FormField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
    variant = "default",
    required = false,
    className = "",
}) => {
    return (
        <div className={`space-y-0.5 sm:space-y-1 ${className}`}>
            {label && (
                <Label
                    htmlFor={name}
                    className="ml-1 text-xs sm:text-sm font-semibold"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}
            <Input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                variant={variant}
                className="text-sm sm:text-base"
            />
        </div>
    );
};

export default FormField;
