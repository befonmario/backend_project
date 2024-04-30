import express from 'express';
import dotenv from 'dotenv';
import connection from './models/connection.js';
import authRoute from './routes/auth.route.js';
import loggingMiddleware from './middlewares/LoggingMiddleware.js';
import userRoute from './routes/user.route.js';
import quizRoute from './routes/quiz.route.js';
import answerRoute from './routes/answer.route.js';
import resultRoute from './routes/result.route.js';
const app = express();
dotenv.config()


app.use(express.json());
app.use(loggingMiddleware)
app.get('/', (req,res)=> {
    res.send("test")
})
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/quizzes', quizRoute);
app.use('/quizzes', answerRoute)
app.use('/result', resultRoute )


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`server running on port http://localhost:${PORT}`)
    
})

connection.getConnection((err) => {
    if(err){
        console.log('error connecting : ', err);
        server.close()
    }else {
        console.log('connected to mysql successfully');
    }
})