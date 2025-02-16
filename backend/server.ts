/**
 * @file server.ts
 * @description This file sets up and starts the Express server for the Quizzo backend application.
 * It configures middleware for CORS and JSON parsing, and sets up routes for authentication and quizzes.
 */

import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import quizRoutes from "./routes/quizRoutes"
import env from "./config/env"

/**
 * Express application instance.
 */
const app = express()

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 */
app.use(cors())

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json())

/**
 * Route for authentication-related endpoints.
 */
app.use("/api/auth", authRoutes)

/**
 * Route for quiz-related endpoints.
 */
app.use("/api/quizzes", quizRoutes)

/**
 * Port number on which the server will listen for incoming requests.
 */
const PORT = env.PORT

/**
 * Starts the server and listens on the specified port.
 * Logs a message to the console once the server is running.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
