const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const Post = require('../models/postSchema')
const jwt = require('jsonwebtoken');
const authlog = require("../middleware/authLog")

const router = express.Router()

// ('/')=> routes for text

router.get('/', async(req,res)=>{
    res.send("hello form server")
})

// routes and logic for the registration link: http:localhost:4000/api/register

router.post('/api/register', async (req, res)=>{
    const {name,email,password,cpassword} = req.body;
    if(!name || !email || !password || !cpassword){
        console.log("fields missing");
        return res.status(422).json({error: "field missing"});
    }

    if(!password || !cpassword){
        console.log("passwords not matching");
        return  res.status(401).json({error: "password not match"})
    }

    const checkUser = await User.findOne({email: email});
    if(checkUser){
        return res.status(401).json({msg: "user alreeady exist"});
    }



    try {
        const newUser = new User({name,email,password});

        await newUser.save();

        res.status(200).json({msg: "user created successfully"})
    } catch (error) {
        res.status(400).json({msg: error})   
    }
})


// login the user routes and controllers

router.post('/api/login', async(req, res)=>{
    
    const {email, password} = req.body;
    console.log(email,password);

    if(!email || !password){
        return res.status(404).json({msg: "field missing"});
    }
    try {
        const findEmail = await User.findOne({email: email});
        console.log('findEmail ', findEmail);
        
        if (findEmail ) {
            const userPass = await bcrypt.compare(password, findEmail.password);
            console.log(userPass);
            const userToken = await findEmail.generateToken();
            console.log(userToken);

        

            if(!userPass){
                return res.status(400).json({msg: "invalid cradential"});
            }else{
                res.status(200).json({msg: "user login successfully",token: userToken})
            }
        }
    } catch (error) {
        res.status(404).json({message: " error in login",error: error})
    }

})


// profile details protected routes

router.get("/api/profile", authlog, async (req, res)=>{

    console.log(req.user);
    const{_id} = req.user;

    const finalUser = await User.findById({_id : _id});

    console.log(finalUser);

    res.status(200).json(finalUser);

})


//user post a post on site
router.post("/api/post",authlog, async(req,res)=>{
    try {
        const {name, userId, description} = req.body;

        const user = await User.findById(userId)
        
        const newPost = new Post({
            userId,
            name,
            description
        })

        await newPost.save();
        const allPost = await Post.find();

        res.status(200).json(allPost);

    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error})
    }



})

router.get('/api/allpost',authlog,async(req,res)=>{
   try {
        const allPost = await Post.find();

        console.log("here show all post data");
        
        console.log(allPost);

        res.status(200).json(allPost)
   } catch (error) {
        res.status(402).json({msg:error})
   }

})


module.exports = router