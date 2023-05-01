import React, { HTMLAttributes } from "react";
import styles from "./styles.module.css";
import { ReactComponent as GameIcon } from "../../assets/gameIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settingsIcon.svg";
import { ReactComponent as StatsIcon } from "../../assets/statsIcon.svg";
import { Link } from "react-router-dom";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onSettings?: () => void;
  onGame?: () => void;
  onStats?: () => void;
}

export const Sidebar = ({ onSettings, onGame, onStats, ...props }: SidebarProps) => {
  return (
    <div className={styles.sidebar} {...props}>
      <div className={styles.icons}>
        <Link to="/">
          <GameIcon onClick={onGame} className={styles.icon} />
        </Link>
        <Link to="/stats">
          <StatsIcon onClick={onStats} className={styles.icon} />
        </Link>
        <Link to="/settings">
          <SettingsIcon onClick={onSettings} className={styles.icon} />
        </Link>
      </div>
    </div>
  );
};
