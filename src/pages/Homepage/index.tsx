import { useState, useCallback } from "react";
import Grid from "../../UI/Grid";
import { Header } from "../../UI/Header";
import LoadingOverlay from "../../UI/Loading";
import { Sidebar } from "../../UI/Sidebar";
import styles from "./styles.module.css";
import { AuthForm } from "../../components/homepage/authForm";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const handleSettings = () => {
    console.log("Settings clicked");
  };

  const handleGame = () => {
    console.log("Game clicked");
  };

  const handleStats = () => {
    console.log("Stats clicked");
  };

  const toggleAuth = () => {
    setTimeout(() => {
      setLoginModalVisible(!loginModalVisible);
    }, 100);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };
  const mockFill = (num: number) => {
    return Array(num)
      .fill(0)
      .map((_, idx) => (
        <div key={Math.random()} className="box">
          {idx}
        </div>
      ));
  };
  const handleGameStart = () => {
    console.log("sdajaskdj");
  };
  return (
    <>
      <Header onLogin={toggleAuth} onLogout={handleLogout} onRegister={toggleAuth} />
      <AuthForm isVisible={loginModalVisible} toggleAuth={toggleAuth} type={"login"} />
      <LoadingOverlay isLoading={isLoading} />
      <Grid size={250} className={styles.gridWrapper}>
        <Link to="/game">
          <img
            src="http://localhost:3000/Assets/slots-icon.webp"
            className={styles.image}
            onClick={handleGameStart}
          />
        </Link>

        {mockFill(10)}
      </Grid>
      <Sidebar onSettings={handleSettings} onGame={handleGame} onStats={handleStats} />
    </>
  );
};
