/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from "react";
import { Container, Sprite } from "@pixi/react";
import { BlurFilter, Texture, Graphics } from "pixi.js";
import { ReelData, SymbolData } from "../types/types";
import { gsap } from "gsap";
import { PlayButton } from "./PlayButton";

interface ReelProps {
  slotTextures: Texture[];
  REEL_WIDTH: number;
  SYMBOL_SIZE: number;
}

export const Reel: React.FC<ReelProps> = ({ slotTextures, REEL_WIDTH, SYMBOL_SIZE }) => {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [running, setRunning] = useState(false);
  const [mask, setMask] = useState<Graphics | null>(null);
  const reelContainer = useRef(null);

  useEffect(() => {
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
          texture: slotTextures[Math.floor(Math.random() * slotTextures.length)],
          x: 0,
          y: j * SYMBOL_SIZE,
        };
        reel.symbols.push(symbol);
      }
      newReels.push(reel);
    }
    setReels(newReels);
  }, [slotTextures]);

  useEffect(() => {
    const newMask = new Graphics();
    newMask.beginFill(0xffffff);
    newMask.drawRect(0, 0, REEL_WIDTH * reels.length, SYMBOL_SIZE * 3.1);
    newMask.endFill();
    setMask(newMask);
  }, [reels.length, REEL_WIDTH, SYMBOL_SIZE]);
  console.log(mask);
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
        symbol.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
      }
    }
  };

  return (
    <>
      <PlayButton x={400} y={600} onClick={startPlay} />
      <Container ref={reelContainer} x={100} y={100} mask={mask}>
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
              />
            ))}
          </Container>
        ))}
      </Container>
    </>
  );
};
