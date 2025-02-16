import { Router } from "express";
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from "../controllers/quizController";

const router = Router();

/**
 * @route GET /:id?
 * @description Retrieve a list of quizzes or a specific quiz by ID if provided.
 */
router.get("/:id?", getQuizzes);

/**
 * @route POST /
 * @description Create a new quiz.
 */
router.post("/", createQuiz);

/**
 * @route PUT /:id
 * @description Update an existing quiz by ID.
 */
router.put("/:id", updateQuiz);

/**
 * @route DELETE /:id
 * @description Delete an existing quiz by ID.
 */
router.delete("/:id", deleteQuiz);

export default router;
