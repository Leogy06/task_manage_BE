import { configDotenv } from "dotenv";

const envPath =
  process.env.NODE_ENV === null ? ".env" : `.env.${process.env.NODE_ENV}`;

configDotenv({
  path: envPath,
});
