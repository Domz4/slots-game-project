import User from "../models/User";
import { Router } from "express";
import { Response, Request } from "express";

const balanceRouter = Router();

balanceRouter.put("/", async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const { amount } = req.body;
  const updatedBalance = await User.findByIdAndUpdate(
    req.user.id,
    { $inc: { balance: amount } },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  res.json(updatedBalance);
});

export default balanceRouter;
