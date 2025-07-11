import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use("/api/auth", authRoutes);

// this should be after al routes to catch errors
app.use(errorHandler);

export default app;
