const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{type:String,
    required:true,
    min:3},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3,
    },
    profilePic:{
        type:String,
        default:''
    },
    coverPic:{
        type:String,
        default:''
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    about:{
        type:String
    },
    city:{
        type:String
    },
    gender:{
        type:Number,
        enum:[1,2,3]
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},
{timestamps:true});

module.exports= User = mongoose.model('User',userSchema);