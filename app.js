import express from 'express';
import dotenv from 'dotenv';
import connection from './models/connection.js';
import authRoute from './routes/auth.route.js';
const app = express();

app.use(express.json());
app.get('/', (req,res)=> {
    res.send("test")
})
app.use('/auth', authRoute)


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