import { Texture } from "pixi.js";
import { Container } from "@pixi/react";
import { BlurFilter } from "pixi.js";

export interface SymbolData {
  texture: Texture;
  x: number;
  y: number;
}
export interface ReelData {
  container: typeof Container | null;
  symbols: SymbolData[];
  position: number;
  previousPosition: number;
  blur: BlurFilter;
}
