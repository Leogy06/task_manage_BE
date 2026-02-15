import { CorsOptions } from "cors";
import "./environment.js";
import "dotenv/config";

console.log("cliuent base url ", process.env.CLIENT_BASEURL);

const corsConfig: CorsOptions = {
  origin: process.env.CLIENT_BASEURL,
  credentials: true,
};

export default corsConfig;
