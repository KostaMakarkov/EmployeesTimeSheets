import express, { Request, Response } from "express";
import cors from "cors";
import { CorsOptions } from "./config/corsSettings";
import { configEnv } from "./config/config";
import connectDB from "./config/db";
import { errorHandler } from "./utils/errorHandler";
import router from "./router";
import morgan from "morgan";

const app = express();
const PORT = configEnv.port;

// Middleware
app.use(morgan("dev"));
app.use(cors(CorsOptions));
app.use(express.json());

// DB connect
connectDB();

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
