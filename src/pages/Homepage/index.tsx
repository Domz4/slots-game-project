import { useState } from "react";
import { Button } from "../../UI/Button";
import Grid from "../../UI/Grid";
import { Header } from "../../UI/Header";
import LoadingOverlay from "../../UI/Loading";
import { Sidebar } from "../../UI/Sidebar";
import styles from "./styles.module.css";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  const handleGame = () => {
    console.log("Game clicked");
  };

  const handleStats = () => {
    console.log("Stats clicked");
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };
  const handleLogout = () => {
    console.log("Logout clicked");
  };
  const handleRegister = () => {
    console.log("Register clicked");
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
  return (
    <>
      <Header onLogin={handleLogin} onLogout={handleLogout} onRegister={handleRegister} />
      <LoadingOverlay isLoading={isLoading} />
      <Grid width={150} height={150} className={styles.gridWrapper}>
        {mockFill(30)}
      </Grid>
      <Sidebar onSettings={handleSettings} onGame={handleGame} onStats={handleStats} />
    </>
  );
};
