import { configDotenv } from "dotenv";

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

configDotenv({
  path: envPath,
});
