import React from "react";

export const FieldEditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width={18} height={18} fill="none" viewBox="0 0 18 18">
        <path
            d="M13.78 2.92a2.125 2.125 0 1 1 3 3l-8.79 8.79-3.6.6.6-3.6 8.79-8.79Z"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
