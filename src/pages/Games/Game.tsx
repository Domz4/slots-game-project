import { lazy, Suspense } from "react";
import LoadingOverlay from "../../UI/Loading";
import styles from "./styles.module.css";
const GameSetup = lazy(() =>
  import("../../components/game/components/GameSetup").then((module) => ({
    default: module.GameSetup,
  }))
);

export const Game = () => {
  return (
    <Suspense fallback={<LoadingOverlay isLoading={true} />}>
      <GameSetup className={styles.gamescreen} />
    </Suspense>
  );
};
