/**
 * Represents a quiz.
 *
 * @interface Quiz
 * @property {number} id - The unique identifier of the quiz.
 * @property {string} title - The title of the quiz.
 * @property {string} description - A brief description of the quiz.
 * @property {string} createdAt - The date and time when the quiz was created.
 * @property {number} user_id - The unique identifier of the user who created the quiz.
 */

export interface Quiz {
  id: number
  title: string
  description: string
  createdAt: string
  user_id: number
}

/**
 * Represents a user.
 *
 * @interface User
 * @property {number} id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 */

export interface User {
  id: number
  username: string
}
