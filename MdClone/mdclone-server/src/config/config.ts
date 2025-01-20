import dotenv from "dotenv";

dotenv.config({ path: "./environments/.env" });

interface Config {
  env: string;
  port: number;
  dbUri: string;
}

export const configEnv: Config = {
  env: process.env.NODE_ENV || "",
  port: parseInt(process.env.PORT || "3000", 10),
  dbUri: process.env.MONGO_URI || "",
};
