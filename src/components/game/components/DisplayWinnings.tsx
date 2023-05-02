import { WinningLine } from "./WinningLine";

interface WinningsProps {
  x: number;
  y: number;
  w: number;
}
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const randomColor = () => {
  const r = randomInt(0, 256);
  const g = randomInt(0, 256);
  const b = randomInt(0, 256);
  return (r << 16) | (g << 8) | b;
};
export const Winnings: React.FC<WinningsProps> = ({ x, y, w }) => {
  const color = randomColor();
  return <WinningLine x={x} y={y} width={w} height={5} color={color} />;
};
