import { Router } from "express";
import { destroy, findAll } from "../controllers/user.controller.js";
import authJwt from "../middlewares/authJwt.js";
const userRoute = Router()

userRoute.use(authJwt)
userRoute.get('/', findAll)
userRoute.delete('/:id', destroy)

export default userRoute