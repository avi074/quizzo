import { configDotenv } from "dotenv";

configDotenv();

/**
 * @constant
 * @name env
 * @description
 * An immutable object containing environment configuration variables for the application.
 * 
 * @property {number|string} PORT - The port number on which the server will run. Defaults to 5000 if not specified in the environment variables.
 * @property {string} DB_HOST - The hostname of the database server. Defaults to "localhost" if not specified in the environment variables.
 * @property {string} DB_USER - The username for the database connection. Defaults to "root" if not specified in the environment variables.
 * @property {string} DB_PASS - The password for the database connection. Defaults to an empty string if not specified in the environment variables.
 * @property {string} DB_NAME - The name of the database. Defaults to "quizzo" if not specified in the environment variables.
 * @property {string} STATIC_USERNAME - The static username for authentication. Defaults to "admin" if not specified in the environment variables.
 * @property {string} STATIC_PASSWORD - The static password for authentication. Defaults to "administrator" if not specified in the environment variables.
 */
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