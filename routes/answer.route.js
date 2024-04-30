import { Router } from "express";
import { createAnswer, getAnswerByName } from "../controllers/answer.controller.js";
import authJwt from "../middlewares/authJwt.js";


const answerRoute = Router();

answerRoute.use(authJwt)
answerRoute.post('/useranswer', createAnswer) //khusus users
answerRoute.get('/dashboard', getAnswerByName); // Endpoint dashboard

export default answerRoute;
