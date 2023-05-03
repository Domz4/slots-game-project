import { useEffect, useCallback, useState } from "react";
import { MainGame } from "./MainGameComp";
import { Stage } from "../utils/ContexBridge";
import { getScreenSize } from "./GameScreen";
import styles from "./styles.module.css";

interface GameSetupProps {
  className: string;
  children?: React.ReactNode;
}
export const GameSetup: React.FC<GameSetupProps> = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  const handleResize = useCallback(() => {
    setScreenSize(getScreenSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const stageW = screenSize ? screenSize.width * 0.8 : 800;
  const stageH = screenSize ? screenSize.height * 0.8 : 800;

  return (
    <div className={styles.container}>
      <Stage
        width={stageW}
        height={stageH}
        className={styles.canvas}
        options={{ autoDensity: true, backgroundColor: 0x0000, backgroundAlpha: 0.3 }}
      >
        <MainGame stageH={stageH} stageW={stageW} />
      </Stage>
    </div>
  );
};
