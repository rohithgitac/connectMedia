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
    followers:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    following:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }}
    ],
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
        type:String,
    },
    relationship:{
        type:String,
    }
},
{timestamps:true});

module.exports= User = mongoose.model('User',userSchema);