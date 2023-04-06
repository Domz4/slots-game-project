import React from "react";
import styles from "./styles.module.css";
import { ReactComponent as GameIcon } from "../../assets/gameIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settingsIcon.svg";
import { ReactComponent as StatsIcon } from "../../assets/statsIcon.svg";
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
                <GameIcon onClick={onGame} className={styles.icon} />
                <StatsIcon onClick={onStats} className={styles.icon} />
                <SettingsIcon onClick={onSettings} className={styles.icon} />
            </div>
        </div>
    );
};
