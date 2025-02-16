import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import quizRoutes from "./routes/quizRoutes"
import env from "./config/env";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/quizzes", quizRoutes)

const PORT = env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
