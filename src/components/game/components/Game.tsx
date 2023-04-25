import { FC, useEffect, useRef, useCallback, useState } from "react";
import { Stage, Sprite } from "@pixi/react";
import { MainGame } from "./MainGameComp";
import { getScreenSize } from "./GameScreen";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setTextures, setIsAssetsLoading, setReels } from "../../../store/slotsSlice";
import { RootState } from "../../../store/store";
import { assetsPath } from "../data/assetsPath";
import { Texture, Assets } from "pixi.js";

interface GameProps {
  title: string;
}

export const SlotsGame: FC<GameProps> = ({ title }) => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  const dispatch = useDispatch();
  const textures = useSelector((state: RootState) => state.slots.textures);
  const isLoading = useSelector((state: RootState) => state.slots.isAssetsLoading);
  const reels = useSelector((state: RootState) => state.slots.reels);

  useEffect(() => {
    const loadAssets = async () => {
      dispatch(setIsAssetsLoading(true));
      await assetsPath();
      const assets: Texture[] = Object.values(await Assets.loadBundle("neo-slots"));
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
    <Stage
      className={styles.canvas}
      width={stageW}
      height={stageH}
      options={{ autoDensity: true, backgroundColor: 0x01262a }}
    >
      <MainGame textures={textures} isLoading={isLoading} />
    </Stage>
  );
};
