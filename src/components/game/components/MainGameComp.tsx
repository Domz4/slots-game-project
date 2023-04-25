import React, { useEffect, useState } from "react";
import { Texture } from "pixi.js";
import { AppProvider, useApp } from "@pixi/react";
import LoadingOverlay from "../../../UI/Loading";
import { Reel } from "./Reels";

interface MainGameProps {
  textures: Texture[];
  isLoading: boolean;
}
export const MainGame: React.FC<MainGameProps> = ({ textures, isLoading }) => {
  const app = useApp();

  const SYMBOL_SIZE = 150;
  const REEL_WIDTH = 160;
  if (isLoading) {
    return (
      <AppProvider value={app}>
        <LoadingOverlay isLoading={false} />
      </AppProvider>
    );
  }
  return textures.length ? (
    <AppProvider value={app}>
      <Reel
        slotTextures={textures}
        SYMBOL_SIZE={SYMBOL_SIZE}
        REEL_WIDTH={REEL_WIDTH}
        // handleReels={handleReels}
        // reels={reels}
      />
    </AppProvider>
  ) : null;
};
