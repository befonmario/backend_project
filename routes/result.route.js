import { Router } from 'express';
import { bandingkanJawaban } from '../controllers/result.controller.js';

const resultRoute = Router();

// Route untuk membandingkan jawaban dan menyimpan hasil
resultRoute.get('/:nama', bandingkanJawaban);

export default resultRoute;
