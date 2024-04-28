import { Router } from "express";
import { createQuiz, publishQuizById, quizzesQuestion, quizzesQuestionById, updateQuiz } from "../controllers/quiz.controller.js";
import authJwt from "../middlewares/authJwt.js";

const quizRoute = Router();

quizRoute.post('/', createQuiz);
quizRoute.get('/exam', quizzesQuestion);
quizRoute.get('/exam/:id', quizzesQuestionById); 
quizRoute.put('/exam/:id', updateQuiz);
quizRoute.put('/publish/:id', publishQuizById);

export default quizRoute;
