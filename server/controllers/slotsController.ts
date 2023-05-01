import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { IUser } from "../models/User";
import User from "../models/User";

const slotsRouter = Router();

const symbols = ["A", "B", "C", "D", "E", "F", "G"];

const generateOutcome = (slots: number = 5): string[] => {
  const outcome: string[] = [];
  for (let i = 0; i < slots; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    outcome.push(symbols[randomIndex]);
  }
  return outcome;
};

const calculateWinnings = (outcome: string[], betAmount: number): number => {
  const uniqueSymbols = new Set(outcome);

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
