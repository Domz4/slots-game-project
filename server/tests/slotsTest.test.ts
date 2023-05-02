import { Request, Response } from "express";
import { IUser } from "../models/User";
import User from "../models/User";
import slotsRouter, { generateOutcome, calculateWinnings } from "../controllers/slotsController";

jest.mock("../models/User.ts");
jest.mock("../middleware/auth.ts", () => ({
  authMiddleware: jest.fn((req: Request, res: Response, next: Function) => next()),
}));

describe("generateOutcome", () => {
  it("should return a matrix of random symbols", () => {
    const outcome = generateOutcome();
    expect(outcome).toHaveLength(3);
    outcome.forEach((row) => {
      expect(row).toHaveLength(5);
    });
  });
});

describe("calculateWinnings", () => {
  it("should calculate winnings based on the outcome", () => {
    const outcome = [
      ["s1", "s1", "s1", "s1", "s1"],
      ["s2", "s2", "s3", "s2", "s2"],
      ["s4", "s4", "s4", "s5", "s6"],
    ];

    const betAmount = 10;
    const winnings = calculateWinnings(outcome, betAmount);
    expect(winnings).toEqual(10 * 3 + 10 * 2 + 10 * 1.5);
  });
});

describe("slotsRouter", () => {
  const user: Partial<IUser> = {
    id: "1",
    username: "test",
    passwordHash: "hashedpassword",
    balance: 1000,
    email: "test@example.com",
    name: "Test User",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return winnings and updated balance after playing", async () => {
    const req: Partial<Request> = {
      user: user as IUser,
      body: {
        betAmount: 10,
      },
    };

    const res: Partial<Response> = {
      json: jest.fn(),
    };

    (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(user);

    const route = slotsRouter.stack.find((layer) => layer.route && layer.route.path === "/play");
    if (route) {
      await route.route.stack[1].handle(req as Request, res as Response);
    } else {
      throw new Error("Route not found");
    }

    const json = res.json as jest.Mock;
    const jsonResponse = json.mock.calls[0][0];
    expect(jsonResponse.winnings).toBeGreaterThanOrEqual(0);
    expect(jsonResponse.updatedBalance).toEqual(
      user.balance! - req.body.betAmount + jsonResponse.winnings
    );
  });
});
