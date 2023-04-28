import { useEffect, useCallback, useState } from "react";
import { MainGame } from "./MainGameComp";
import { Stage } from "../utils/ContexBridge";
import { getScreenSize } from "./GameScreen";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setTextures, setIsAssetsLoading } from "../../../store/slotsSlice";
import { RootState } from "../../../store/store";
import { assetsPath } from "../data/assetsPath";
import { Texture, Assets } from "pixi.js";

interface GameSetupProps {
  className: string;
  children?: React.ReactNode;
}
export const GameSetup: React.FC<GameSetupProps> = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  const dispatch = useDispatch();
  const textures = useSelector((state: RootState) => state.slots.textures);

  useEffect(() => {
    const loadAssets = async () => {
      dispatch(setIsAssetsLoading(true));
      await assetsPath();
      const loadedAssets = await Assets.loadBundle("neo-slots");
      const assets: Texture[] = Object.values(loadedAssets);
      dispatch(setTextures(textures.concat(...assets)));
      dispatch(setIsAssetsLoading(false));
    };
    loadAssets();
  }, []);

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
        options={{ autoDensity: true, backgroundColor: 0x0000, backgroundAlpha: 0.1 }}
      >
        <MainGame textures={textures} stageH={stageH} stageW={stageW} />
      </Stage>
    </div>
  );
};
