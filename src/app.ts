import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

// routes
import corsConfig from "./config/corsConfig.js";

const app = express();

//cors
app.use(cors(corsConfig));

app.use(express.json());

app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Hello!");
});

// this should be after al routes to catch errors
app.use(errorHandler);

export default app;
