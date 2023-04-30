import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const PORT = process.env.PORT ?? 3001;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET || "default";
