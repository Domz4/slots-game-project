import React from "react";
import { Sprite } from "@pixi/react";

interface PlayButtonProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick, x, y }) => {
  return (
    <Sprite
      interactive
      height={100}
      width={100}
      x={x}
      y={y}
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png"
      pointertap={onClick}
    />
  );
};
