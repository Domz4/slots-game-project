import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { IUser } from "../models/User";
import User from "../models/User";
import reelsData from "../reels.json";

const slotsRouter = Router();

const reels = [reelsData.reel1, reelsData.reel2, reelsData.reel3, reelsData.reel4, reelsData.reel5];

const spinReels = (reels: number[][]): number[][] => {
  const shifts = reels.map((reel) => Math.floor(Math.random() * reel.length));
  return reels.map((reel, i) => applyShift(reel, shifts[i]));
};

const applyShift = (reel: number[], shift: number): number[] => {
  return reel.slice(shift).concat(reel.slice(0, shift));
};

export const generateOutcome = (rows: number = 3, cols: number = 5): number[][] => {
  const shiftedReels = spinReels(reels);
  const outcome: number[][] = [];

  for (let i = 0; i < cols; i++) {
    const col: number[] = [];
    for (let j = 0; j < rows; j++) {
      col.push(shiftedReels[i][j]);
    }
    outcome.push(col);
  }
  return outcome;
};

export const calculateWinnings = (outcome: number[][], betAmount: number) => {
  let winnings = 0;
  let winningLines: number[][] = [];

  const checkLine = (line: number[]): number => {
    let maxCount = 0;
    let currentCount = 1;

    for (let i = 1; i < line.length; i++) {
      if (line[i] === line[i - 1]) {
        currentCount++;
      } else {
        maxCount = Math.max(maxCount, currentCount);
        currentCount = 1;
      }
    }
    maxCount = Math.max(maxCount, currentCount);

    if (maxCount >= 3) {
      winningLines.push(line);
      if (maxCount === 3) return betAmount * 1.1;
      if (maxCount === 4) return betAmount * 1.7;
      if (maxCount >= 5) return betAmount * 2.7;
    }

    return 0;
  };

  for (let i = 0; i < outcome.length; i++) {
    winnings += checkLine(outcome[i]);
  }

  return { winnings, winningLines };
};

slotsRouter.post("/play", authMiddleware, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const { betAmount } = req.body;
  const user = req.user as IUser;

  if (user.balance < betAmount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const outcome = generateOutcome();
  const { winnings, winningLines } = calculateWinnings(outcome, betAmount);

  const updatedBalance = user.balance - betAmount + winnings;
  await User.findByIdAndUpdate(user.id, { balance: updatedBalance });

  res.json({ outcome, winnings, updatedBalance, winningLines });
});

slotsRouter.get("/reels", (req: Request, res: Response) => {
  res.json(reelsData);
});

export default slotsRouter;
