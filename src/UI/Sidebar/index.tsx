import React from "react";
import styles from "./styles.module.css";
import gameIcon from "../../assets/gameIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import statsIcon from "../../assets/statsIcon.svg";

interface SidebarProps {
    children?: React.ReactNode;
    onSettings?: () => void;
    onGame?: () => void;
    onStats?: () => void;
}

export const Sidebar = ({
    onSettings,
    onGame,
    onStats,
    ...props
}: SidebarProps) => {
    return (
        <div className={styles.sidebar} {...props}>
            <div className={styles.icons}>
                <img
                    onClick={onGame}
                    className={styles.icon}
                    src={gameIcon}
                    alt="game icon"
                />
                <img
                    onClick={onStats}
                    className={styles.icon}
                    src={statsIcon}
                    alt="game icon"
                />
                <img
                    onClick={onSettings}
                    className={styles.icon}
                    src={settingsIcon}
                    alt="game icon"
                />
            </div>
        </div>
    );
};
