const express =require('express');
const mongoose = require('mongoose')
const router = express.Router()
const Post =require('../models/postModel')

//Create a post 
router.post('/',async(req,res) => {

    const dataPost = req.body;
    try {
        const newPost = await new Post(dataPost) ;
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error.!'});
    }
})

//Update a post  
router.put('/:id',async(req,res) => {
    const post = await Post.findById(req.params.id);
    try {
        if(post.userId === req.body.userId){
            const resultPost = await Post.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
            await resultPost.save();                    //Returns the updated post
            res.status(200).json(resultPost);

        }else{
            res.status(403).json({msg:'You can update your post only.!'});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error.!'});
    }
})

//Delete a post
router.delete('/:id',async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({msg:'Post not found.!'})
        }
        else if(post && (post.userId === req.body.userId)){
            await post.deleteOne();
            res.status(200).json({msg:'Post deleted.!'});

        }else{
            res.status(403).json({msg:'You can delete your post only.!'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error.!'});
    }
})

//Like a user
router.put('/:id/like',async(req,res) => {
    console.log(req.body.user)
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({msg:'No post found'})
        }
        else if(!post.likes.includes(req.body.user)){
            const likePost = await post.updateOne({$push:{likes:req.body.user}})
            res.status(200).json({msg:'Post liked',like:true})
        }else {
            const unlikePost = await post.updateOne({$pull:{likes:req.body.user}})
            res.status(200).json({msg:'Post unliked',like:false})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error'});
    }
})

//Get a post 
router.get('/:id',async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({msg:'Post not found'});
        }
        else{
            res.status(200).json(post);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error'})
    }
})
//Timeline posts
router.get('/timeline/:userId',async(req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({user:currentUser._id})
                                    .populate('user','userName profilePic')
                                    .sort({createdAt:-1});
        res.status(200).json(userPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error'})
    }
})
//Home posts
router.get('/homepost/:userId',async(req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({user:currentUser._id})
                                    .populate('user','userName profilePic _id')
                                    .sort({date:-1});
        if(currentUser.following){
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({user:friendId.user})
                            .populate('user','userName profilePic _id')
                            .sort({date:-1})
            })
        )
        const allPost = userPosts.concat(...friendPosts)
        allPost.sort((a,b) => a.createdAt - b.createdAt)
        res.status(200).json(allPost.reverse());
        }else{
            res.status(200).json(userPosts.reverse());

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Internal server error'})
    }
})
module.exports = router