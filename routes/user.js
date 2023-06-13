const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();
//Update user
router.put('/:id',async(req,res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin)
    {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                res.status(500).json({msg:err.message})
            }
        }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body})
        res.status(200).json({msg:'Account has been updated'})
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
        const {password,updatedAt,...others}= user._doc;
        console.log(others);
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
    if(req.body.userid !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})
                await user.save() && currentUser.save();
                res.status(200).json({msg:'Following success'})
            }else{
                res.status(403).json({msg:'You are already following this profile.!'})
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
    if(req.body.userid !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.id}})
                await user.save() && currentUser.save();
                res.status(200).json({msg:'Unfollowed..!'})
            }else{
                res.status(403).json({msg:'You are already unfollowed this profile.!'})
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({msg:'Intenal server error'})
        }
    }
    else{
       res.status(400).json({msg:'You can not Unfollow yourself'}) 
    }
})

module.exports = router;