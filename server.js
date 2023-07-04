const express = require('express');
const morgan = require('morgan')
const app = express();
const dotenv =require('dotenv')
const helmet = require('helmet');
const cors = require('cors');
// const multer = require('multer');
const path = require('path')
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
app.use("/public",express.static(path.join(__dirname,"smarttime/public")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,"smarttime/public")
//     },
//     filename:(req,file,cb) => {
//         cb(null,req.body.name)
//     }
// })
// const upload = multer({storage})
// app.post('/connect/upload',upload.single('file'),(req,res) => {
//     try {
//         console.log('req.body is ',req.body.name)
//         res.status(200).json({msg:'File uploaded successfully'})
//     } catch (error) {
//         console.log(error)
//     }
// })

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