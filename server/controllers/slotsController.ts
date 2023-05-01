import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { IUser } from "../models/User";
import User from "../models/User";

const slotsRouter = Router();

const symbols = ["A", "B", "C", "D", "E", "F", "G"];

const generateOutcome = (rows: number = 3, cols: number = 5): string[][] => {
  const outcome: string[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      row.push(symbols[randomIndex]);
    }
    outcome.push(row);
  }
  return outcome;
};

const calculateWinnings = (outcome: string[][], betAmount: number): number => {
  let winnings = 0;

  const checkLine = (line: string[]): number => {
    const uniqueSymbols = new Set(line);

    if (uniqueSymbols.size === 1) {
      return betAmount * 3;
    }

    if (uniqueSymbols.size === 2) {
      return betAmount * 2;
    }

    if (uniqueSymbols.size === 3) {
      return betAmount * 1.5;
    }

    return 0;
  };

  for (let i = 0; i < outcome.length; i++) {
    winnings += checkLine(outcome[i]);
  }

  return winnings;
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
  const winnings = calculateWinnings(outcome, betAmount);

  const updatedBalance = user.balance - betAmount + winnings;
  await User.findByIdAndUpdate(user.id, { balance: updatedBalance });

  res.json({ outcome, winnings, updatedBalance });
});

export default slotsRouter;
