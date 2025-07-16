import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import { requireAuth } from "./middlewares/auth.js";
import corsConfig from "./config/corsConfig.js";

const app = express();

//cors
app.use(cors(corsConfig));

app.use(express.json());

app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.use("/api/auth", authRoutes);

// user routes
app.use("/api/users", userRoutes);

//income routes
app.use("/api/incomes", requireAuth, incomeRoutes);

// this should be after al routes to catch errors
app.use(errorHandler);

export default app;
