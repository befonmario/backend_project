import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv";
import jwt from 'jsonwebtoken'



export const login = (req, res) => {
    const { username, password} = req.body

    //check if user is registered
        //lanjut login
        //kirim msg username belum terdaftar

    User.findByUsername(username, async (err, user)=> {
        if(err) {
            if(err.type == 'not_found') {
                //user not found
                return res.status(404).send({
                    message: `User not registered`
                })
            } else {
                res.status(500).send({msg: "exist some error"})
            }
        }

        //check password benar atau tidak
        const userPassword = user.password
        const isValidPassword = await bcrypt.compare(password,userPassword)
        console.log(isValidPassword);
        if(!isValidPassword){
            return res.status(401).json({message: "Invalid password"})
        }

        //lolos
        //parameter (userInfo, secretKey, expiredTime)
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({userId: user.id}, 'passwordKey', {expiresIn: '1h'} )
        res.json({ token });

    
    })


}

export const register = async (req, res) => {
    //check if username already registered
    const userExist = await new Promise((resolve, reject) => {
        User.findByUsername(req.body.username, (err, data)=> {
            if(err) {
                if(err.type == 'not_found') {
                    //username not registered
                    resolve(false)
                } else {
                    //got some error
                    reject(err)
                }
            } else {
                //username registered
                resolve(true)
            }
        })
        
    })

    if(userExist){
        return res.status(400).json({message:"username already exist"})
    }
        
    
    const encryptPassword = await bcrypt.hash(req.body.password, 10)


    const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        password: encryptPassword,
        email: req.body.email
    })

    console.log(newUser)


    User.create(newUser, (err, data)=> {
        if(err) {
            return err
        }
        res.send(data)
    })
}