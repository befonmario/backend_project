import jwt from 'jsonwebtoken'

const authJwt = (req, res, next) => {
    const token = req.headers['authorization'].replace("bearer ", "")
    console.log(token)
    if(!token){
        return res.status(401).send({message:'missing access token'})
    }

    //verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if(err){
            return res.status(403).send({message: 'Invalid Token'})
        }
    console.log(decoded)
    req.userId = decoded.userId
    next()
    })

}

export default authJwt