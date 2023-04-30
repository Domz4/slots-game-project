import React from "react";
import styles from "./styles.module.css";

interface ProgressProps {
  total: number;
  progress: number;
  children: React.ReactNode;
}

export const ProgressBar = ({ children, progress, total = 100, ...props }: ProgressProps) => {
  return (
    <div className={styles.bar} {...props}>
      {children}
      <div style={{ width: `${(progress * 100) / total}%` }} className={styles.filter}>
        <span className={styles.label}>{`${progress}/${total}`}</span>
      </div>
    </div>
  );
};
