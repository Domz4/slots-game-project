import styles from "./modules/Backdrop.module.css";

interface BackdropProps {
  onClose: () => void;
}

export const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};
