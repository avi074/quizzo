import { Request, Response } from "express"
import db from "../models/db"

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    let query = "SELECT * FROM quizzes"
    const { id } = req.params
    if (id) {
      query += ` WHERE id = ${id}`
    }
    const [rows]: any = await db.query(query)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: "Error fetching quizzes", error: err })
  }
}

export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, user_id } = req.body

  if (!title || !description || !user_id) {
    res
      .status(400)
      .json({ message: "Title, Description & User_ID are required" })
    return
  }

  try {
    await db.query(
      "INSERT INTO quizzes (title, description, user_id) VALUES (?, ?)",
      [title, description, user_id],
    )
    res.status(201).json({ message: "Quiz created successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz", error: err })
  }
}

export const updateQuiz = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description } = req.body

  if (!title || !description) {
    res.status(400).json({ message: "Title and description are required" })
    return
  }

  try {
    await db.query(
      "UPDATE quizzes SET title = ?, description = ? WHERE id = ?",
      [title, description, id],
    )
    res.json({ message: "Quiz updated successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error updating quiz", error: err })
  }
}

export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await db.query("DELETE FROM quizzes WHERE id = ?", [id])
    res.json({ message: "Quiz deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting quiz", error: err })
  }
}
