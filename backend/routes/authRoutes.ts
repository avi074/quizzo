import { Router } from "express"
import { loginUser } from "../controllers/authController"

const router = Router()

/**
 * @route POST /login
 * @description login a user
 */
router.post("/login", loginUser)

export default router
