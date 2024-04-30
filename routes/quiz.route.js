import { Router } from "express";
import { createQuiz, publishQuizById, quizzesQuestion, quizzesQuestionById, updateQuiz } from "../controllers/quiz.controller.js";
import authJwt from "../middlewares/authJwt.js";

const quizRoute = Router();

quizRoute.use(authJwt)
quizRoute.post('/', createQuiz); // untuk role superadmin, admin
quizRoute.get('/exam', quizzesQuestion); //untuk role superadmin, admin, user
quizRoute.get('/exam/:id', quizzesQuestionById); // untuk role superadmin, admin, user
quizRoute.put('/exam/:id', updateQuiz); // untuk role superadmin, admin
quizRoute.put('/publish/:id', publishQuizById); // untuk role superadmin, admin

export default quizRoute;
