import React from "react";
import Card from "../atoms/Card";
import Label from "../atoms/Label";

const TopListCard = ({ title, items, renderItem, className = "" }) => {
    return (
        <Card variant="elevated" padding="md" className={className}>
            <Label className="mb-3 sm:mb-4">{title}</Label>
            <div className="space-y-3 sm:space-y-4">
                {items.map((item, index) => renderItem(item, index))}
            </div>
        </Card>
    );
};

export default TopListCard;
