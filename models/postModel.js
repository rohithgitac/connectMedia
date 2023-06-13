const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postDesc:{
        type:String,
        max:500
    },
    img:{type:String},
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports= Post = mongoose.model('post',postSchema)