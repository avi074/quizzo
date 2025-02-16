import { Request, Response } from "express"
import env from "../config/env"

const STATIC_USERNAME = env.STATIC_USERNAME
const STATIC_PASSWORD = env.STATIC_PASSWORD

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ message: "Username and password required" })
    return
  }

  if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
    res.json({ success: true, id: 1, username })
  } else {
    res.status(401).json({ message: "Invalid credentials" })
  }
}
