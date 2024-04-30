import { Router } from "express";
import { destroy, findAll, findProfile, updateProfile } from "../controllers/user.controller.js";
import authJwt from "../middlewares/authJwt.js";
import checkUser from "../middlewares/checkUser.js";
const userRoute = Router()

userRoute.use(authJwt)
userRoute.get('/', findAll) //superadmin
userRoute.delete('/:id', destroy)//superadmin
userRoute.get('/profile/:name', checkUser, findProfile);
userRoute.put('/profile/:name', checkUser, updateProfile);


export default userRoute