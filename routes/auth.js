const express = require('express');
const User = require('../models/userModel')
const router = express.Router();
const bcrypt = require('bcrypt');
//Register a new user
router.post('/register',async(req,res) => {
    const newData = req.body;
    if(Object.keys(newData).length === 0){
        res.status(400).send({msg:'No user data entered..!'})
    }
    else{
        try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newData.password,salt);
        console.log(hashedPassword);
        const newUser = new User({
            userName:newData.userName,
            email:newData.email,
            password:hashedPassword
        })
        const user = await newUser.save();
        res.status(201).json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).send({msg:'Internal server error-register'});
    }}
})

//Login
router.post('/login',async(req,res) => {
    const checkData = req.body;
    if(Object.keys(checkData).length === 0){
        res.status(400).send({msg:'No client data received..!'})
    }
    else{
        try {
            const validData = await User.findOne({email:checkData.email});
            if(validData === null){ res.status(404).json({msg:"Invalid email!"}) }
            else{
            const checkPassword = await bcrypt.compare(checkData.password,validData.password);
            checkPassword === false ? res.status(404).json({msg:'Invalid password!'})
                :res.status(200).json(validData)
            }    
        } catch (error) {
            console.error(error);
            res.status(500).json({msg:'Internal server error-login'})
        }
    }
})

module.exports = router;