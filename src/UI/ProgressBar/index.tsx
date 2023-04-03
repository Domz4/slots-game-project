import React from "react";
import styles from "./styles.module.css";

interface ProgressProps {
    progress: number;
    children: React.ReactNode;
}

export const ProgressBar = ({
    children,
    progress,
    ...props
}: ProgressProps) => {
    return (
        <div className={styles.bar} {...props}>
            {children}
            <div style={{ width: `${progress}%` }} className={styles.filter}>
                <span className={styles.label}>{`${progress}%`}</span>
            </div>
        </div>
    );
};
