/* eslint-disable react/no-array-index-key */
import { useRef, useEffect, useState } from "react";
import { Container, Sprite } from "@pixi/react";
import { BlurFilter, Texture, Graphics } from "pixi.js";
import { ReelData, SymbolData } from "../types/types";
import { gsap } from "gsap";
import { assetsPath } from "../data/assetsPath";
import { Assets } from "pixi.js";
import { Winnings } from "./DisplayWinnings";
import { RootState, useAppDispatch } from "../../../store/store";
import { setBalance } from "../../../store/authSlice";
import { spinSlot } from "../../../store/slotsSlice";
import { useSelector } from "react-redux";
import { getInitPosition } from "../../../services/apiHandler";
import { Outcome } from "../../../store/slotsSlice";
import { setReels } from "../../../store/slotsSlice";

interface ReelProps {
  REEL_WIDTH: number;
  SYMBOL_SIZE: number;
  bet: number;
}

export const Reels: React.FC<ReelProps> = ({ REEL_WIDTH, SYMBOL_SIZE, bet }) => {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [reelTape, setReelTape] = useState<number[][]>([]);
  const [running, setRunning] = useState(false);
  const [mask, setMask] = useState<Graphics | null>(null);
  const [textures, setTextures] = useState<Texture[]>([]);
  const reelContainer = useRef(null);
  const dispatch = useAppDispatch();

  const outcome = useSelector((state: RootState) => state.slots.outcome);

  const symbols = ["s1", "s2", "s3", "s4", "s5", "s6", "s7"];

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

    const initializeReels = async () => {
      const getReels = await getInitPosition();
      const initReels = [
        getReels.reel1,
        getReels.reel2,
        getReels.reel3,
        getReels.reel4,
        getReels.reel5,
      ];

      setReelTape(initReels);

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
          const symbolIndex = symbols.indexOf(`s${initReels[i][j]}`);
          if (symbolIndex !== -1) {
            const texture = textures[symbolIndex];

            const symbol: SymbolData = {
              texture: texture,
              x: 0,
              y: j * SYMBOL_SIZE,
            };
            reel.symbols.push(symbol);
          }
        }
        newReels.push(reel);
      }
      setReels(newReels);
    };

    initializeReels();
  }, [textures]);
  const reelsComplete = () => {
    setRunning(false);
  };

  const startPlay = async () => {
    if (running) return;
    setRunning(true);

    try {
      const spinSlotPromise = dispatch(spinSlot(bet));

      spinSlotPromise.then(() => {
        if (outcome) {
          const updatedUser = {
            balance: outcome.updatedBalance,
          };
          dispatch(setBalance(updatedUser));
        }
        for (let i = 0; i < reels.length; i++) {
          const reel = reels[i];
          const extra = Math.floor(Math.random() * 3);
          const target = reel.position + 10 + i * 5 + extra;
          const time = 1.2 + i * 0.2 + extra * 0.2;

          gsap.to(reel, {
            position: target,
            duration: time,
            ease: "back.out(0.3)",
            onUpdate: () => {
              updateReel(reel, outcome);
              setReels([...reels]);
            },
            onComplete: () => {
              if (i === reels.length - 1) reelsComplete();
            },
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const updateReel = (reel: ReelData, outcome: Outcome | null) => {
    reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
    reel.previousPosition = reel.position;
    for (let j = 0; j < reel.symbols.length; j++) {
      const symbol = reel.symbols[j];
      const prevy = symbol.y;
      symbol.y = ((reel.position + j) % reel.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
      if (symbol.y > 600) symbol.y = -150;
      if (symbol.y < 0 && prevy > SYMBOL_SIZE) {
        console.log(outcome?.outcome[j]);
        symbol.texture = textures[j];
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
    <>
      <Winnings x={10} y={10} w={10} />
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
    </>
  ) : null;
};
