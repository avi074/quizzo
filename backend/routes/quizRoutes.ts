import { Router } from "express";
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from "../controllers/quizController";

const router = Router();

router.get("/:id?", getQuizzes);
router.post("/", createQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
