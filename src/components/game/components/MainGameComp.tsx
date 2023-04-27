import React, { useEffect } from "react";
import { Texture, Graphics } from "pixi.js";
import { AppProvider, useApp, Container } from "@pixi/react";
import { Reel } from "./Reels";

interface MainGameProps {
  textures: Texture[];
  stageH: number;
  stageW: number;
}
export const MainGame: React.FC<MainGameProps> = ({ textures, stageH, stageW }) => {
  const app = useApp();

  const SYMBOL_SIZE = 150;
  const REEL_WIDTH = 160;

  return textures.length ? (
    <AppProvider value={app}>
      <Container position={[(stageW - REEL_WIDTH * 5) / 2, (stageH - REEL_WIDTH * 4) / 2]}>
        <Reel slotTextures={textures} SYMBOL_SIZE={SYMBOL_SIZE} REEL_WIDTH={REEL_WIDTH} />
      </Container>
    </AppProvider>
  ) : null;
};
