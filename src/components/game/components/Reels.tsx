/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from "react";
import { Container, Sprite } from "@pixi/react";
import { BlurFilter, Texture, Graphics } from "pixi.js";
import { ReelData, SymbolData } from "../types/types";
import { gsap } from "gsap";
import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { assetsPath } from "../data/assetsPath";
import { Assets } from "pixi.js";

interface ReelProps {
  REEL_WIDTH: number;
  SYMBOL_SIZE: number;
}

export const Reels: React.FC<ReelProps> = ({ REEL_WIDTH, SYMBOL_SIZE }) => {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [running, setRunning] = useState(false);
  const [mask, setMask] = useState<Graphics | null>(null);
  const [textures, setTextures] = useState<Texture[]>([]);
  const reelContainer = useRef(null);

  console.log(reels);
  useEffect(() => {
    const loadAssets = async () => {
      await assetsPath();
      const loadedAssets = await Assets.loadBundle("neo-slots");
      const assets: Texture[] = Object.values(loadedAssets);
      setTextures([...assets]);
    };
    loadAssets();
  }, []);
  useEffect(() => {
    if (!textures.length) return;
    const newReels: ReelData[] = [];
    for (let i = 0; i < 5; i++) {
      const reel: ReelData = {
        container: null,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new BlurFilter(),
      };
      reel.blur.blurX = 0;
      reel.blur.blurY = 0;

      for (let j = 0; j < 4; j++) {
        const symbol: SymbolData = {
          texture: textures[Math.floor(Math.random() * textures.length)],
          x: 0,
          y: j * SYMBOL_SIZE,
        };
        reel.symbols.push(symbol);
      }
      newReels.push(reel);
    }
    setReels(newReels);
  }, [textures]);

  const reelsComplete = () => {
    setRunning(false);
  };

  const startPlay = () => {
    if (running) return;
    setRunning(true);

    for (let i = 0; i < reels.length; i++) {
      const reel = reels[i];
      const extra = Math.floor(Math.random() * 3);
      const target = reel.position + 10 + i * 5 + extra;
      const time = 2 + i * 0.4 + extra * 0.3;

      gsap.to(reel, {
        position: target,
        duration: time,
        ease: "back.out(0.3)",
        onUpdate: () => {
          updateReel(reel);
          setReels([...reels]);
        },
        onComplete: i === reels.length - 1 ? reelsComplete : undefined,
      });
    }
  };

  const updateReel = (reel: ReelData) => {
    reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
    reel.previousPosition = reel.position;

    for (let j = 0; j < reel.symbols.length; j++) {
      const symbol = reel.symbols[j];
      const prevy = symbol.y;
      symbol.y = ((reel.position + j) % reel.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
      if (symbol.y < 0 && prevy > SYMBOL_SIZE) {
        symbol.texture = textures[Math.floor(Math.random() * textures.length)];
      }
    }
  };

  useEffect(() => {
    const g = new Graphics();
    g.beginFill(0xffffff);
    g.drawRect(0, 100, REEL_WIDTH * 10, REEL_WIDTH * 2.9);
    g.endFill();
    setMask(g);
  }, []);

  return textures.length ? (
    <Container x={50} y={120} ref={reelContainer} mask={mask}>
      {reels.map((reel, index) => (
        <Container key={index} x={index * REEL_WIDTH} filters={[reel.blur]}>
          {reel.symbols.map((symbol, idx) => (
            <Sprite
              key={idx}
              texture={symbol.texture}
              x={symbol.x}
              y={symbol.y}
              width={150}
              height={150}
              anchor={0.5}
              interactive={true}
              onclick={startPlay}
              zIndex={1}
            />
          ))}
        </Container>
      ))}
    </Container>
  ) : null;
};
