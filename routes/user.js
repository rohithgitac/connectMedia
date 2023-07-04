const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();
//Update user
router.put('/:id',async(req,res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin)
    {
        if(req.body.password !== ''){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                res.status(500).json({msg:err.message})
            }
        }
    try{
        if(req.body.password === ''){
        console.log('no password ...')
        const editedData = {
            userName : req.body.userName,
            email : req.body.email,
            city : req.body.city,
            about : req.body.about,
            gender : req.body.gender,
            relationship : req.body.relationship,
        }
        req.body.profilePic && (editedData.profilePic = req.body.profilePic)
        req.body.coverPic && (editedData.coverPic = req.body.coverPic)
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set:editedData},{new:true})
        
        res.status(200).json(user)
        }    
        else {
        console.log('yes psaword..')
        const editedData = {
            userName : req.body.userName,
            email : req.body.email,
            city : req.body.city,
            about : req.body.about,
            gender : req.body.gender,
            relationship : req.body.relationship
        }
        const editedDatapassword = {...editedData,password:req.body.password}
        const withPassword = await User.findByIdAndUpdate(req.params.id,
            {$set:editedDatapassword},{new:true})
        res.status(200).json(withPassword)
        }    
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'Inernal server error'});
    }}
    else{
        res.status(401).json({msg:"You can update your account only"})
    }
})
//Delete a user
router.delete('/:id',async(req,res) => {
    console.log(req.body.userId)
    console.log(req.params.id)
    if(req.body.userId == req.params.id || req.body.isAdmin)
    {
        try{
        const user = await User.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg:'Account has been deleted'})
        }
        catch(error){
        console.log(error);
        res.status(500).json({msg:'Inernal server error'});
        }
    }else{
        res.status(401).json({msg:'It is not your account'})
    }    
})

//get a user
router.get('/:id',async(req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        if(user){
        const {password,updatedAt,...others}= user._doc
        res.status(200).json(others);
        }
        else
        res.status(400).json({msg:'This user doesnot exist'})
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Intenal server error'})
    }
})

//follow a user

router.put('/:id/follow',async(req,res) => {
    if(req.body.userId !== req.params.id){
        try {
            const friend = await User.findById(req.params.id)
            if(friend.followers.some(followers => followers.user.toString() === req.body.userId))
            {
                res.status(200).json({msg:'You are already following this profile.!'})
            }else{
                await friend.updateOne({$push:{followers:{user:req.body.userId}}})
                const newUser = await User.findByIdAndUpdate(req.body.userId,
                                        {$push:{following:{user:req.params.id}}},
                                        {new:true})
                                        .select('-password')
                await friend.save() 
            
                res.status(200).json(newUser)
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({msg:'Intenal server error'})
        }
    }
    else{
       res.status(400).json({msg:'You can not follow yourself'}) 
    }
})

//Unfollow a user
router.put('/:id/unfollow',async(req,res) => {
    if(req.body.userId !== req.params.id){
        try {
            const friend = await User.findById(req.params.id)
            
            if(friend.followers.some(followers => followers.user.toString() === req.body.userId))
            {
                await friend.updateOne({$pull:{followers:{user:req.body.userId}}})
                const newUser = await User.findByIdAndUpdate(req.body.userId,
                    {$pull:{following:{user:req.params.id}}},
                    {new:true})
                    .select('-password')
                await friend.save() && newUser.save();
                res.status(200).json(newUser)
            }else{
                res.status(200).json({msg:'You are already Unfollowing this profile.!'})
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({msg:'Intenal server error'})
        }
    }
    else{
       res.status(400).json({msg:'You can not unfollow yourself'}) 
    }
})

//Get user friends Details

router.put('/:id/friendlist',async(req,res) => {
    try{
    const friends = await User.findById(req.body.userId).populate('following.user','userName profilePic')
    if(friends.following){
    res.status(200).json(friends.following)
    }else{
        res.status(200).json({msg:'No following'})
    }

    }catch(error){
        console.error(error)
        res.status(500).json({msg:'Internal server error'})
    }
})

//Get all user as suggestions

router.put('/:id/suggestion',async(req,res) => {
    try{
        if(req.body._id === req.params.id){
        const allSuggestion = await User.find().select('_id userName profilePic').limit(6)
        const filtered = allSuggestion.filter((person)=> person._id.toString() !==req.params.id )
        
        res.status(200).json(filtered)
        }
        else{
            res.status(401).json({msg:'Not authorized'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({msg:'Internal server error'})
    }

})
module.exports = router;