import { configDotenv } from "dotenv";

const envPath = process.env.NODE_ENV === "production" ? ".env" : ".env.local";

configDotenv({
  path: envPath,
});
