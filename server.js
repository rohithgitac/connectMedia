const express = require('express');
const morgan = require('morgan')
const app = express();
const dotenv =require('dotenv')
const helmet = require('helmet');
dotenv.config();

const db = require('./db/dbConnection');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')
//Config
const PORT = process.env.PORT;

//Database connection
db();

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/connect/user',userRoute);
app.use('/connect/auth',authRoute);
app.use('/connect/post',postRoute);
//Routes
app.get('/',(req,res)=>{
    res.send('server is working..');
})


app.listen(PORT,()=> {
    console.log(`Server running on ${PORT}`);
})