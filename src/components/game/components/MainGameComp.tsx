import React, { useEffect, useState } from "react";
import { AppProvider, useApp, Container, Sprite, Text } from "@pixi/react";
import { Reels } from "./Reels";
import { Assets, Texture, TextStyle } from "pixi.js";

interface MainGameProps {
  stageH: number;
  stageW: number;
}
export const MainGame: React.FC<MainGameProps> = ({ stageH, stageW }) => {
  const [uiAssets, setUiAssets] = useState<Texture[]>();
  const [bet, setBet] = useState<number>(100);

  const app = useApp();

  const SYMBOL_SIZE = 150;
  const REEL_WIDTH = 160;

  useEffect(() => {
    const loader = async () => {
      const loadedAsset = await Assets.loadBundle("ui");
      const assets: Texture[] = Object.values(loadedAsset);
      setUiAssets(assets);
    };
    loader();
  }, []);

  const handleBet = (action: "add" | "subtract") => {
    if (action === "add") {
      setBet(bet + 100);
    } else if (action === "subtract") {
      setBet(Math.max(bet - 100, 0));
    }
  };
  return (
    <AppProvider value={app}>
      {uiAssets ? (
        <Container>
          <Sprite
            texture={uiAssets[0]}
            anchor={0.5}
            x={stageW / 2}
            y={stageH / 2 - 50}
            height={650}
            width={1100}
            zIndex={0}
          />
          <Sprite
            texture={uiAssets[1]}
            anchor={0.5}
            x={400}
            y={stageH - 70}
            height={55}
            width={55}
            interactive={true}
            onclick={() => handleBet("add")}
          />
          <Sprite
            texture={uiAssets[2]}
            anchor={0.5}
            x={100}
            y={stageH - 70}
            height={55}
            width={55}
            interactive={true}
            onclick={() => handleBet("subtract")}
          />
          <Text
            text={`${bet}$`}
            anchor={0.5}
            x={250}
            y={stageH - 70}
            style={
              new TextStyle({
                align: "center",
                fontFamily: '"Fira Code", Helvetica, sans-serif',
                fontSize: 50,
                strokeThickness: 0,
                fill: "#ffffff",
                letterSpacing: -5,
                wordWrap: true,
                wordWrapWidth: 440,
              })
            }
          />
        </Container>
      ) : null}
      <Container position={[(stageW - SYMBOL_SIZE * 5) / 2, (stageH - REEL_WIDTH * 4) / 2]}>
        <Reels SYMBOL_SIZE={SYMBOL_SIZE} REEL_WIDTH={REEL_WIDTH} bet={bet} />
      </Container>
    </AppProvider>
  );
};
