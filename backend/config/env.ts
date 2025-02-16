import { configDotenv } from "dotenv";

configDotenv();

const env = Object.freeze({
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "quizzo",
  STATIC_USERNAME: process.env.STATIC_USERNAME || "admin",
  STATIC_PASSWORD: process.env.STATIC_PASSWORD || "administrator",
})

export default env;