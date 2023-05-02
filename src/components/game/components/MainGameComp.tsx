import React, { useEffect, useState } from "react";
import { AppProvider, useApp, Container, Sprite } from "@pixi/react";
import { Reels } from "./Reels";
import { Assets, Texture } from "pixi.js";

interface MainGameProps {
  stageH: number;
  stageW: number;
}
export const MainGame: React.FC<MainGameProps> = ({ stageH, stageW }) => {
  const [border, setBorder] = useState<Texture>();
  const app = useApp();

  const SYMBOL_SIZE = 150;
  const REEL_WIDTH = 160;

  useEffect(() => {
    const loader = async () => {
      const loadedAsset = await Assets.load("border");
      setBorder(loadedAsset);
    };
    loader();
  }, []);

  return (
    <AppProvider value={app}>
      {border ? (
        <Sprite
          texture={border}
          anchor={0.5}
          x={window.innerWidth / 2 - 200}
          y={window.innerHeight / 2 - 140}
          height={650}
          width={1100}
          zIndex={0}
        />
      ) : null}
      <Container position={[(stageW - SYMBOL_SIZE * 5) / 2, (stageH - REEL_WIDTH * 4) / 2]}>
        <Reels SYMBOL_SIZE={SYMBOL_SIZE} REEL_WIDTH={REEL_WIDTH} />
      </Container>
    </AppProvider>
  );
};
