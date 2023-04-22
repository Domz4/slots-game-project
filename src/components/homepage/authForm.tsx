import React, { FC, useState, useCallback } from "react";
import { Modal } from "../../UI/Modal/Modal";
import useAuth from "../../hooks/useAuth";
import { loginUser, registerUser } from "../../services/authService";

interface loginProps {
  isVisible: boolean;
  toggleAuth: () => void;
  type: "login" | "register";
}

export const AuthForm: FC<loginProps> = ({ isVisible, toggleAuth, type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState(type);
  const { saveToken } = useAuth();

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } =
        activeTab === "login"
          ? await loginUser({ email, password })
          : await registerUser({ email, password, username });
      saveToken(token);
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      throw new Error(`Error ${activeTab}:${error}`);
    }
  };

  return (
    <>
      <Modal visible={isVisible} onClose={toggleAuth} title={activeTab}>
        <div>
          <button onClick={() => handleTabChange("login")}>Login</button>
          <button onClick={() => handleTabChange("register")}>Register</button>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>{activeTab === "login" ? "Login" : "Register"}</h2>
          {activeTab === "register" && (
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{activeTab === "login" ? "Login" : "Register"}</button>
        </form>
      </Modal>
    </>
  );
};
