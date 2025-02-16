import { Request, Response } from "express"
import env from "../config/env"

const STATIC_USERNAME = env.STATIC_USERNAME
const STATIC_PASSWORD = env.STATIC_PASSWORD

/**
 * @description Logs in a user by checking the provided username and password against static credentials.
 * @param {Request} req - Express Request object containing the username and password in the body.
 * @param {Response} res - Express Response object used to send the response to the client.
 * @returns {void}
 */
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
