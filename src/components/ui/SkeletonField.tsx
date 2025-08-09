import React from "react";
import styles from "./SkeletonField.module.css";

interface SkeletonFieldProps {
    width?: number | string;
    height?: number | string;
    style?: React.CSSProperties;
    className?: string;
    radius?: number | string;
}

export const SkeletonField: React.FC<SkeletonFieldProps> = ({
                                                                width = "100%",
                                                                height = 20,
                                                                style,
                                                                className,
                                                                radius = "8px",
                                                            }) => (
    <div
        className={`${styles.skeleton} ${className || ""}`}
        style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
            borderRadius: typeof radius === "number" ? `${radius}px` : radius,
            ...style,
        }}
        aria-busy="true"
    />
);
