const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    postDesc:{
        type:String,
        max:500
    },
    img:{type:String},
    likes:[
        String
    ],
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        message:{type:String},
        name:{type:String},
        profilePic:{type:String},
        time:{type:Date,default:Date.now()}
    }]
},{timestamps:true})

module.exports= Post = mongoose.model('post',postSchema)