import { CorsOptions } from "cors";
import "./environment.js";

const corsConfig: CorsOptions = {
  origin: process.env.CLIENT_BASEURL,
  credentials: true,
};

export default corsConfig;
