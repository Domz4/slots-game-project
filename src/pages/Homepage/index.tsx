import { useState } from "react";
import { Button } from "../../UI/Button";
import Grid from "../../UI/GameList";
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
  return (
    <div className="App">
      <main className={styles.container}>
        <Header onLogin={handleLogin} onLogout={handleLogout} onRegister={handleRegister} />
        <Sidebar onSettings={handleSettings} onGame={handleGame} onStats={handleStats} />
        <LoadingOverlay isLoading={isLoading} />
        <Grid width={100} height={100}>
          <div className="first">first</div>
          <div className="first">first</div>
          <div className="first">first</div>
        </Grid>
      </main>
    </div>
  );
};
