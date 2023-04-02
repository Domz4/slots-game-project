import React from "react";
import styles from "./styles.module.css";
import gameIcon from "../../assets/gameIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import statsIcon from "../../assets/statsIcon.svg";

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.icons}>
                <img className={styles.icon} src={gameIcon} alt="game icon" />
                <img className={styles.icon} src={statsIcon} alt="game icon" />
                <img className={styles.icon} src={settingsIcon} alt="game icon" />
            </div>
            {children}
        </div>
    );
};
