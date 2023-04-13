import { Button } from "../Button";
import { ReactComponent as Logo } from "../../assets/logo-mock.svg";
import styles from "./styles.module.css";
import { HTMLAttributes } from "react";

type User = {
  name: string;
};
interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
}

export const Header = ({ user, onLogin, onLogout, onRegister, ...props }: HeaderProps) => {
  return (
    <header className={styles.header} {...props}>
      <a href="/" className={styles.logo}>
        <Logo className={styles.logo}></Logo>
      </a>
      {user ? (
        <div className={styles.user}>
          <div>
            <span>$0</span>
          </div>
          <div className="username">
            <span>{user.name}</span>
          </div>
          <Button variant="secondary-alt" size="mini" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className={styles.user}>
          <Button variant="secondary" size="mini" onClick={onLogin}>
            Login
          </Button>
          <div className="btn__wrapper">
            <Button variant="primary" size="mini" onClick={onRegister}>
              Register now!
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
