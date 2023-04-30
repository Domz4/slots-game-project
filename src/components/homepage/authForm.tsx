import React, { FC, useState } from "react";
import { Modal } from "../../UI/Modal/Modal";
import { useAppDispatch } from "../../store/store";
import { registerUser, clearRegisterError } from "../../store/userSlice";
import { loginUser, clearLoginError } from "../../store/authSlice";
import styles from "./styles.module.css";

interface authFormProps {
  isVisible: boolean;
  toggleAuth: () => void;
  activeTab: "Login" | "Register";
}

export const AuthForm: FC<authFormProps> = ({ isVisible, toggleAuth, activeTab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const action =
      activeTab === "Login"
        ? await dispatch(loginUser({ username, password }))
        : await dispatch(registerUser({ username, name, password, email }));

    if (loginUser.fulfilled.match(action) || registerUser.fulfilled.match(action)) {
      setEmail("");
      setPassword("");
      setName("");
      setUsername("");
      toggleAuth();
    } else {
      if (loginUser.rejected.match(action)) {
        setError(action.error.message || "Error logging in");
        dispatch(clearLoginError());
      }
      if (registerUser.rejected.match(action)) {
        setError(action.error.message || "Error registering");
        dispatch(clearRegisterError());
      }
    }
  };
  return (
    <>
      <Modal visible={isVisible} onClose={toggleAuth} title={""}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2 className={styles.name}>{activeTab === "Login" ? "Login" : "Register"}</h2>
          {activeTab === "Register" ? (
            <div className={styles.register}>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button className={styles.btn} type="submit">
            {activeTab === "Login" ? "Login" : "Register"}
          </button>
          {error && <p>{error}</p>}
        </form>
      </Modal>
    </>
  );
};
