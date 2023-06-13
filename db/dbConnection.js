const mongoose = require('mongoose');


const db = async() => {
    try{

        const MONGO_URI = process.env.MONGO_URI;
        
        await mongoose.connect(MONGO_URI);
           
        console.log('MongoDB connected...!!')
    
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
    
}

module.exports = db ; 