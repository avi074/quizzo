import { Request, Response } from "express"
import db from "../models/db"

/**
 * Retrieves quizzes from the database.
 * 
 * If an `id` parameter is provided in the request, it fetches the quiz with the specified `id`.
 * Otherwise, it fetches all quizzes.
 * 
 * @param req - The request object containing parameters and other request data.
 * @param res - The response object used to send back the desired HTTP response.
 * 
 * @returns A JSON response containing the quiz data or an error message.
 * 
 * @throws Will return a 500 status code with an error message if there is an issue fetching quizzes.
 */
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

/**
 * Creates a new quiz.
 *
 * This function handles the creation of a new quiz by inserting the provided
 * title, description, and user ID into the database. It expects the request
 * body to contain `title`, `description`, and `user_id` fields.
 *
 * @param req - The request object containing the quiz details in the body.
 * @param res - The response object used to send the status and result back to the client.
 *
 * @returns A JSON response indicating the success or failure of the quiz creation.
 *
 * @throws Will return a 400 status code if any of the required fields (`title`, `description`, `user_id`) are missing.
 * @throws Will return a 500 status code if there is an error during the database query.
 */
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
      "INSERT INTO quizzes (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, user_id],
    )
    res.status(201).json({ message: "Quiz created successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz", error: err })
  }
}

/**
 * Updates an existing quiz with the provided title and description.
 *
 * @param req - The request object containing the quiz ID in the URL parameters and the new title and description in the body.
 * @param res - The response object used to send back the appropriate HTTP response.
 * 
 * @throws Will throw an error if the database query fails.
 */
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

/**
 * Deletes a quiz from the database based on the provided quiz ID.
 *
 * @param req - The request object containing the quiz ID in the URL parameters.
 * @param res - The response object used to send back the appropriate response.
 *
 * @returns A JSON response indicating the success or failure of the deletion operation.
 *
 * @throws Will return a 500 status code and an error message if the deletion fails.
 */
export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await db.query("DELETE FROM quizzes WHERE id = ?", [id])
    res.json({ message: "Quiz deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting quiz", error: err })
  }
}
