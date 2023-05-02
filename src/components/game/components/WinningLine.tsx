import { Graphics } from "pixi.js";
import { PixiComponent } from "@pixi/react";

interface WinningLineProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
}

export const WinningLine = PixiComponent<WinningLineProps, Graphics>("WinningLine", {
  create: () => new Graphics(),
  applyProps: (ins, _, props) => {
    ins.x = props.x;
    ins.beginFill(props.color);
    ins.drawRect(props.x, props.y, props.width, props.height);
    ins.endFill();
  },
});
