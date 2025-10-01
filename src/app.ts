import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

import corsConfig from "./config/corsConfig.js";

// routes
import userRoutes from "./routes/user.js";
import requireUserAuthMiddleWare from "./middlewares/requireUserAuth.js";

const app = express();

//cors
app.use(cors(corsConfig));

app.use(express.json());

app.use(cookieParser());

app.get("/api", requireUserAuthMiddleWare, (req, res) => {
  res.send("Hello!");
});

app.use("/api/users", userRoutes);

// this should be after all routes to catch errors
app.use(errorHandler);

export default app;
